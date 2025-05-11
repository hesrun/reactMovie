import { BASE_URL, GET_HEADER } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import FilmGrid from '../../components/FilmGrid/FilmGrid';
import Button from '../../ui/Button/Button';
import { useLocation } from 'react-router-dom';
import { H2 } from '../../ui/Title/Title';
import PageError from '../../components/Errors/PageError';
import axios from 'axios';
import { CiGrid41 } from 'react-icons/ci';

const Movies = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [debouncedGenres, setDebouncedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const location = useLocation();

    const getToday = () => new Date().toISOString().split('T')[0];

    const getTitle = () => {
        switch (location.pathname) {
            case '/movie':
                return 'Popular Films';
            case '/movie/upcoming':
                return 'Upcoming Films';
            case '/movie/top':
                return 'Top Rated Films';
            case '/movie/now-playing':
                return 'Now Playing Films';
            case '/tv':
                return 'Popular TV Shows';
            case '/tv/on-air':
                return 'TV Shows Airing Today';
            case '/tv/top':
                return 'Top Rated TV Show';
            default:
                return '';
        }
    };

    const buildUrl = (pathname, page = 1, genres = []) => {
        const genreParams =
            genres.length > 0 ? `&with_genres=${genres.join(',')}` : '';
        switch (pathname) {
            case '/movie':
                return `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}${genreParams}`;
            case '/movie/upcoming':
                return `${BASE_URL}/discover/movie?sort_by=release_date.desc&release_date.gte=${getToday()}&page=${page}${genreParams}`;
            case '/movie/top':
                return `${BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&page=${page}${genreParams}`;
            case '/movie/now-playing':
                return `${BASE_URL}/discover/movie?sort_by=release_date.desc&release_date.lte=${getToday()}&page=${page}${genreParams}`;
            case '/tv':
                return `${BASE_URL}/discover/tv?sort_by=popularity.desc&page=${page}${genreParams}`;
            case '/tv/on-air':
                return `${BASE_URL}/discover/tv?sort_by=first_air_date.desc&first_air_date.gte=${getToday()}&page=${page}${genreParams}`;
            case '/tv/top':
                return `${BASE_URL}/discover/tv?sort_by=vote_average.desc&vote_count.gte=100&page=${page}${genreParams}`;
            default:
                return '';
        }
    };

    const fetchGenres = async (path) => {
        try {
            setIsLoading(true);
            const url = path.includes('/movie')
                ? `${BASE_URL}/genre/movie/list`
                : `${BASE_URL}/genre/tv/list`;

            const response = await axios.get(url, GET_HEADER);
            setGenres(response.data.genres);
        } catch (error) {
            setError(error.message || 'Something wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.get(url, GET_HEADER);
            const combinedData = response.data.results.map((item) => ({
                ...item,
                type: url.includes('/movie') ? 'movie' : 'tv',
            }));
            setData((prev) =>
                page > 1 ? [...prev, ...combinedData] : combinedData
            );
            setTotalPages(response.data.total_pages);
        } catch (error) {
            setError(error.message || 'Something wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenresChange = (e) => {
        const { checked, value } = e.target;

        setSelectedGenres((prev) =>
            checked
                ? [...prev, Number(value)]
                : prev.filter((item) => item !== Number(value))
        );
        setPage(1);
    };

    useEffect(() => {
        fetchGenres(location.pathname);
        setSelectedGenres([]);
        setPage(1);
    }, [location.pathname]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedGenres(selectedGenres);
        }, 500);
        return () => clearTimeout(handler);
    }, [selectedGenres]);

    useEffect(() => {
        fetchData(buildUrl(location.pathname, page, debouncedGenres));
    }, [location.pathname, page, debouncedGenres]);

    if (error) {
        return <PageError>{error}</PageError>;
    }

    return (
        <>
            {genres && (
                <div className="flex overflow-auto lg:flex-wrap gap-4">
                    {genres.map((item) => (
                        <label
                            className="flex shrink-0 items-center gap-2 bg-white/20 rounded-2xl px-3 py-1 hover:bg-white/10 has-checked:bg-gradient-to-r from-purple-900 to-indigo-900 cursor-pointer"
                            htmlFor={item.name}
                            key={item.id}
                        >
                            <input
                                checked={selectedGenres.includes(item.id)}
                                onChange={handleGenresChange}
                                className="hidden"
                                type="checkbox"
                                name="genres"
                                id={item.name}
                                value={item.id}
                            />

                            <span className="text-sm">{item.name}</span>
                        </label>
                    ))}
                </div>
            )}

            {data.length > 0 ? (
                <>
                    <H2>{getTitle()}</H2>
                    <FilmGrid data={data} loading={isLoading} />
                </>
            ) : (
                <div
                    className="mt-4 md:mt-8 bg-white/10 rounded-2xl
                p-4 flex items-center gap-4 justify-center h-40"
                >
                    <CiGrid41 className="text-4xl" />
                    <span className="text-xl">Empty list</span>
                </div>
            )}

            {totalPages !== page && (
                <div className="mt-8 max-w-80 mx-auto">
                    <Button
                        onClick={() => setPage(page + 1)}
                        className="w-full"
                    >
                        {isLoading ? 'Loading...' : 'Show More'}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Movies;
