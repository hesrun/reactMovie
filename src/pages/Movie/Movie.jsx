import { BASE_URL, API_KEY } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import moviesStore from '../../stores/appStore';
import ReleaseStatus from '../../components/ui/Release/ReleaseStatus';
import ActorsCarusel from '../../components/ui/ActorsCarusel/ActorsCarusel';
import Button from '../../components/ui/Button/Button';
import { H1, H2 } from '../../components/ui/Title/Title';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

const headerGet = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

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
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            moviesStore.addToFavorite(movie, type);
        } else {
            moviesStore.removeFromFavorite(movie.id);
        }
    };

    useEffect(() => {
        const getMovieData = async () => {
            try {
                setIsLoading(true);
                const [movieResponse, creditsResponse] = await Promise.all([
                    axios.get(movieUrl, headerGet),
                    axios.get(creditsUrl, headerGet),
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
            moviesStore.favorite.some((item) => item.id === Number(id))
        );
    }, [moviesStore.favorite, id]);

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;
    return (
        <>
            <div className="-mt-4 grid gap-4 md:mt-0 md:gap-16 md:grid-cols-12">
                <div className="-mx-4 mb-4 md:mb-16 md:col-span-6 sm:mx-0 xl:col-span-4">
                    <img
                        className="w-full"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.original_title}
                    />
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
                    <Button onClick={toggleFavorite}>
                        {!isFavorite ? (
                            <>
                                <MdFavoriteBorder className="text-xl" />
                                Add to Favorite
                            </>
                        ) : (
                            <>
                                <MdFavorite className="text-xl" />
                                Remove From Favorite
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div>
                <H2>Top Billed Cast</H2>
                <ActorsCarusel data={credits.cast.slice(0, 15)} />
            </div>
        </>
    );
});

export default Movie;
