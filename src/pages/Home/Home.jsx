import { BASE_URL, GET_HEADER } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import FilmCarusel from '../../components/FilmCarusel/FilmCarusel';
import { H2 } from '../../ui/Title/Title';
import axios from 'axios';
import PageError from '../../components/Errors/PageError';

const homeURLS = [
    `${BASE_URL}/movie/popular`,
    `${BASE_URL}/tv/popular`,
    `${BASE_URL}/trending/movie/week`,
    `${BASE_URL}/trending/tv/week`,
];

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState({
        popularFilms: [],
        popularSeries: [],
        weeklyFilms: [],
        weeklySeries: [],
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [popularFilms, popularSeries, weeklyFilms, weeklySeries] =
                await Promise.all(
                    homeURLS.map((item) => axios.get(item, GET_HEADER))
                );
            setData({
                popularFilms: popularFilms.data.results,
                popularSeries: popularSeries.data.results,
                weeklyFilms: weeklyFilms.data.results,
                weeklySeries: weeklySeries.data.results,
            });
        } catch (error) {
            setError(error.message || 'Something wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return <PageError>{error}</PageError>;
    }
    return (
        <div>
            <H2>Wekly top films</H2>
            <FilmCarusel
                data={data.popularFilms}
                type="movie"
                loading={isLoading}
            ></FilmCarusel>
            <H2>Wekly top TV Show</H2>
            <FilmCarusel
                data={data.popularSeries}
                type="tv"
                loading={isLoading}
            ></FilmCarusel>
            <H2>Popular Movies</H2>
            <FilmCarusel
                data={data.weeklyFilms}
                type="movie"
                loading={isLoading}
            ></FilmCarusel>
            <H2>Popular TV Show</H2>
            <FilmCarusel
                data={data.weeklySeries}
                type="tv"
                loading={isLoading}
            ></FilmCarusel>
        </div>
    );
};

export default Home;
