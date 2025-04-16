import { BASE_URL, GET_HEADER } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import ReleaseStatus from '../../components/ui/Release/ReleaseStatus';
import ActorsCarusel from '../../components/ui/ActorsCarusel/ActorsCarusel';
import PageError from '../../components/ui/Errors/PageError';
import Button from '../../components/ui/Button/Button';
import { H1, H2 } from '../../components/ui/Title/Title';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GiFilmStrip } from 'react-icons/gi';
import favoriteStore from '../../stores/favoriteStore';
import authStore from '../../stores/authStore';

const Movie = observer(({ type }) => {
    const { id } = useParams();

    const movieUrl = `${BASE_URL}/${type}/${id}`;
    const creditsUrl = `${BASE_URL}/${type}/${id}/credits`;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    const toggleFavorite = () => {
        if (!isFavorite) {
            favoriteStore.addFavorite(authStore.user.id, id, movie, type);
        } else {
            favoriteStore.removeFavorite(authStore.user.id, id);
        }
    };

    useEffect(() => {
        const getMovieData = async () => {
            try {
                setIsLoading(true);
                const [movieResponse, creditsResponse] = await Promise.all([
                    axios.get(movieUrl, GET_HEADER),
                    axios.get(creditsUrl, GET_HEADER),
                ]);
                setMovie(movieResponse.data);
                setCredits(creditsResponse.data);
            } catch (error) {
                setError('Fetch data Error');
            } finally {
                setIsLoading(false);
            }
        };
        getMovieData();
    }, [id]);

    useEffect(() => {
        setIsFavorite(
            favoriteStore.favorites.some((item) => item.favoriteId === id)
        );
    }, [favoriteStore.favorites, id]);

    if (isLoading)
        return (
            <div>
                <div className="-mt-4 grid gap-4 md:mt-0 md:gap-16 md:grid-cols-12">
                    <div className="-mx-4 md:col-span-6 sm:mx-0 xl:col-span-4">
                        <Skeleton
                            className="!block aspect-2/3"
                            baseColor="rgba(67, 56, 202, 0.2)"
                            highlightColor="rgba(129, 140, 248, 0.3)"
                            inline={true}
                        />
                    </div>
                    <div className="md:col-span-6 xl:col-span-8">
                        <div className="mb-4 md:mb-6">
                            <Skeleton
                                className="!block h-8 max-w-100"
                                baseColor="rgba(67, 56, 202, 0.2)"
                                highlightColor="rgba(129, 140, 248, 0.3)"
                                inline={true}
                            />
                        </div>
                        <div className="mb-4 md:mb-6">
                            <Skeleton
                                className="h-2 max-w-10/12"
                                baseColor="rgba(67, 56, 202, 0.2)"
                                highlightColor="rgba(129, 140, 248, 0.3)"
                            />
                            <Skeleton
                                className="h-2 max-w-8/12"
                                baseColor="rgba(67, 56, 202, 0.2)"
                                highlightColor="rgba(129, 140, 248, 0.3)"
                            />
                            <Skeleton
                                className="h-2 max-w-6/12"
                                baseColor="rgba(67, 56, 202, 0.2)"
                                highlightColor="rgba(129, 140, 248, 0.3)"
                            />
                        </div>
                        <div className="mb-4 md:mb-8 flex flex-wrap gap-4">
                            {Array(6)
                                .fill(0)
                                .map((item) => (
                                    <Skeleton
                                        className="!block h-10 aspect-2/1"
                                        baseColor="rgba(67, 56, 202, 0.2)"
                                        highlightColor="rgba(129, 140, 248, 0.3)"
                                        inline={true}
                                    />
                                ))}
                        </div>
                        <div className="mb-4 md:mb-8">
                            <Skeleton
                                className="!block h-4 !w-20 !rounded-full mb-4"
                                baseColor="rgba(67, 56, 202, 0.2)"
                                highlightColor="rgba(129, 140, 248, 0.3)"
                                inline={true}
                            />
                            <div className="flex flex-wrap gap-4">
                                {Array(5)
                                    .fill(0)
                                    .map((_, item) => (
                                        <Skeleton
                                            className="!block h-8 aspect-3/1 !rounded-full"
                                            baseColor="rgba(67, 56, 202, 0.2)"
                                            highlightColor="rgba(129, 140, 248, 0.3)"
                                            inline={true}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    if (error) return <PageError>{error}</PageError>;
    return (
        <>
            <div className="-mt-4 mb-4 md:mb-16 grid gap-4 md:mt-0 md:gap-16 md:grid-cols-12">
                <div className="-mx-4 md:col-span-6 sm:mx-0 xl:col-span-4">
                    {movie.poster_path ? (
                        <img
                            className="w-full md:rounded-2xl"
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            alt={movie.original_title}
                        />
                    ) : (
                        <div className="aspect-2/3 bg-indigo-500/30 md:rounded-2xl flex">
                            <GiFilmStrip className="m-auto text-6xl lg:text-8xl opacity-30" />
                        </div>
                    )}
                </div>
                <div className="md:col-span-6 xl:col-span-8">
                    <H1>
                        {movie.original_title
                            ? movie.original_title
                            : movie.name}
                    </H1>
                    <div className="mb-4 md:mb-8">{movie.overview}</div>
                    <div className="mb-4 md:mb-8 grid grid-cols-3 gap-4 xl:flex xl:gap-8">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">
                                Rating
                            </span>
                            <span className="flex items-center gap-2">
                                {movie.vote_average.toFixed(1)}
                                <FaStar className="text-amber-500" />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">
                                Status
                            </span>
                            <ReleaseStatus type={movie.status}>
                                {movie.status}
                            </ReleaseStatus>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">
                                Release Date
                            </span>
                            <div>
                                {movie.release_date
                                    ? movie.release_date
                                    : movie.first_air_date}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">
                                {movie.runtime ? 'Duration' : 'Seasons'}
                            </span>
                            {movie.runtime
                                ? `${Math.floor(movie.runtime / 60)}h ${
                                      movie.runtime % 60
                                  }min`
                                : movie.number_of_seasons}
                        </div>
                        {movie.budget ? (
                            <div className="flex flex-col">
                                <span className="text-gray-400 text-sm">
                                    Budget
                                </span>
                                <div>
                                    {movie.budget > 0
                                        ? `$ ${movie.budget.toLocaleString(
                                              'en-US'
                                          )}`
                                        : 'Unknoun'}
                                </div>
                            </div>
                        ) : null}

                        <div className="flex flex-col">
                            <span className="text-gray-400 text-sm">
                                {movie.revenue !== undefined
                                    ? 'Revenue'
                                    : 'Type'}
                            </span>
                            <div>
                                {movie.revenue > 0
                                    ? `$ ${movie.revenue.toLocaleString(
                                          'en-US'
                                      )}`
                                    : movie.revenue === 0
                                    ? 'Unknown'
                                    : movie.type || 'Unknown'}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-8">
                        Genres:
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {movie.genres.map((item) => (
                                <li
                                    className="bg-gradient-to-r from-violet-900 to-fuchsia-900 rounded-2xl tracking-wide uppercase text-sm px-5 py-1
"
                                    key={item.id}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {authStore.isAuth && (
                        <Button
                            className="w-full md:w-auto"
                            onClick={toggleFavorite}
                        >
                            {!isFavorite ? (
                                <>
                                    <MdFavoriteBorder className="text-xl" />
                                    {favoriteStore.isLoading
                                        ? 'Loading...'
                                        : 'Add to Favorite'}
                                </>
                            ) : (
                                <>
                                    <MdFavorite className="text-xl" />
                                    {favoriteStore.isLoading
                                        ? 'Loading...'
                                        : 'Remove From Favorite'}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
            {credits && (
                <div>
                    <H2>Top Billed Cast</H2>
                    <ActorsCarusel data={credits.cast.slice(0, 15)} />
                </div>
            )}
        </>
    );
});

export default Movie;
