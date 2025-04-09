import { BASE_URL } from '../constants/constants';
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import moviesStore from '../stores/appStore';
import FilmCarusel from '../components/ui/FilmCarusel/FilmCarusel';
import { H2 } from '../components/ui/Title/Title';

const popularFilmsUrl = `${BASE_URL}/movie/popular`;
const popularSeriesUrl = `${BASE_URL}/tv/popular`;
const weeklyTopMoviesUrl = `${BASE_URL}/trending/movie/week`;
const weeklyTopTVUrl = `${BASE_URL}/trending/tv/week`;

const Home = observer(() => {
    useEffect(() => {
        moviesStore.fetchData(popularFilmsUrl, 'popularFilms', 'movie');
        moviesStore.fetchData(popularSeriesUrl, 'popularSeries', 'tv');
        moviesStore.fetchData(weeklyTopMoviesUrl, 'weeklyFilms', 'movie');
        moviesStore.fetchData(weeklyTopTVUrl, 'weeklySeries', 'tv');
    }, []);

    return (
        <div>
            <H2>Wekly top films</H2>
            <FilmCarusel
                data={moviesStore.weeklyFilms}
                type="movie"
                loading={moviesStore.isLoading}
            ></FilmCarusel>
            <H2>Wekly top TV Show</H2>
            <FilmCarusel
                data={moviesStore.weeklySeries}
                type="tv"
                loading={moviesStore.isLoading}
            ></FilmCarusel>
            <H2>Popular Movies</H2>
            <FilmCarusel
                data={moviesStore.popularFilms}
                type="movie"
                loading={moviesStore.isLoading}
            ></FilmCarusel>
            <H2>Popular TV Show</H2>
            <FilmCarusel
                data={moviesStore.popularSeries}
                type="tv"
                loading={moviesStore.isLoading}
            ></FilmCarusel>
        </div>
    );
});

export default Home;
