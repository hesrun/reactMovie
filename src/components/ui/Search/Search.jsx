import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { BASE_URL, GET_HEADER } from '../../../constants/constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegSadCry, FaStar } from 'react-icons/fa';
import { GiFilmStrip } from 'react-icons/gi';
import { useRef } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

const movieUrl = `${BASE_URL}/search/movie`;
const tvUrl = `${BASE_URL}/search/tv`;

const Search = () => {
    const searchRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
        setIsOpen(!isOpen);
        if (searchResult.length > 0) {
            setSearchResult(null);
        }
    };

    const searchItems = async () => {
        if (!search.trim()) {
            setSearchResult(null);
            return;
        }
        try {
            setIsLoading(true);
            const [movieResponse, tvResponse] = await Promise.all([
                axios.get(`${movieUrl}?query=${search}`, GET_HEADER),
                axios.get(`${tvUrl}?query=${search}`, GET_HEADER),
            ]);

            const typedMovie = movieResponse.data.results.map((item) => {
                return {
                    ...item,
                    type: 'movie',
                };
            });
            const typedTV = tvResponse.data.results.map((item) => {
                return {
                    ...item,
                    type: 'tv',
                };
            });
            setSearchResult([...typedMovie, ...typedTV]);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            searchItems();
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [search]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center">
            {isOpen && (
                <>
                    <div
                        ref={searchRef}
                        className="absolute z-20 right-12 h-full top-0 left-4 md:left-40 bg-indigo-950 place-content-center"
                    >
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            name=""
                            id=""
                            placeholder="Movie, Serials, TV Shows..."
                            className="bg-white/20 w-full rounded-lg px-4 py-1 md:py-2 transition-all"
                        />
                        {searchResult?.length > 0 && (
                            <div className="fixed md:absolute bg-black/10 left-0 w-full backdrop-blur-2xl rounded-sm space-y-2 p-4 max-h-[50vh] overflow-auto c-scrollbar">
                                {searchResult?.map((item) => (
                                    <Link
                                        to={`/${item.type}/${item.id}`}
                                        key={item.id}
                                        className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors"
                                        onClick={toggleSearch}
                                    >
                                        <div className="aspect-2/3 w-10 flex bg-indigo-950 shrink-0">
                                            {item.poster_path ? (
                                                <img
                                                    className=""
                                                    src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <GiFilmStrip className="m-auto" />
                                            )}
                                        </div>
                                        <span className="overflow-hidden text-xs whitespace-nowrap text-ellipsis mr-auto lg:text-sm">
                                            {item.type === 'movie'
                                                ? item.title
                                                : item.name}
                                        </span>
                                        <span className="uppercase text-xs text-white/50 hidden lg:block">
                                            {item.type}
                                        </span>
                                        <span className="flex items-center mr-4 text-sm gap-1">
                                            <FaStar className="text-amber-500" />
                                            {item.vote_average?.toFixed(1)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {searchResult && searchResult.length === 0 && (
                            <div className="fixed md:absolute bg-black/10 left-0 w-full backdrop-blur-2xl rounded-sm py-8 flex items-center gap-4 justify-center">
                                No search resault{' '}
                                <FaRegSadCry className="text-2xl" />
                            </div>
                        )}
                        {isLoading && (
                            <LuLoaderCircle className="animate-spin absolute right-0 top-1/2 -translate-y-1/2 text-xl" />
                        )}
                    </div>
                </>
            )}
            <button
                onClick={toggleSearch}
                className="cursor-pointer hover:text-red-700"
            >
                {isOpen ? (
                    <IoMdClose className="text-2xl" />
                ) : (
                    <IoIosSearch className="text-2xl" />
                )}
            </button>
        </div>
    );
};

export default Search;
