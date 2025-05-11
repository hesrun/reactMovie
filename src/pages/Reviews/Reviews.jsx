import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, GET_HEADER } from '../../constants/constants';
import axios from 'axios';
import { GiFilmStrip } from 'react-icons/gi';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import { FaLongArrowAltLeft } from 'react-icons/fa';

const Reviews = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const movieUrl = `${BASE_URL}/${type}/${id}`;
    const reviewsURL = `${BASE_URL}/${type}/${id}/reviews`;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState(null);

    const getReviewData = async () => {
        try {
            setIsLoading(true);
            const [movieResponse, reviewResponse] = await Promise.all([
                axios.get(movieUrl, GET_HEADER),
                axios.get(reviewsURL, GET_HEADER),
            ]);
            setMovie(movieResponse.data);
            setReviews(reviewResponse.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getReviewData();
    }, [id, type]);

    if (error) return <PageError>{error}</PageError>;

    return (
        <>
            {movie && (
                <div className="flex mb-8 items-center gap-4">
                    <div className="w-[80px]">
                        {movie.poster_path ? (
                            <img
                                className="w-full rounded-xl md:rounded-2xl"
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.original_title}
                            />
                        ) : (
                            <div className="aspect-2/3 bg-indigo-500/30 md:rounded-2xl flex">
                                <GiFilmStrip className="m-auto text-xl opacity-30" />
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-red-600 hover:opacity-90 cursor-pointer"
                        >
                            <FaLongArrowAltLeft /> Go back
                        </button>
                        <div className="text-2xl md:text-4xl mt-2">
                            {type === 'movie'
                                ? `${movie.title} (${
                                      movie.release_date.split('-')[0]
                                  })`
                                : movie?.name}
                        </div>
                    </div>
                </div>
            )}
            {reviews?.results.length > 0 && (
                <ReviewsList data={reviews?.results} />
            )}
        </>
    );
};

export default Reviews;
