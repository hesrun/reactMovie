import { BASE_URL } from '../constants/constants';
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import moviesStore from '../stores/appStore';
import FilmCarusel from '../components/ui/FilmCarusel/FilmCarusel';
import { H2 } from '../components/ui/Title/Title';

const popularFilmsUrl = `${BASE_URL}/movie/popular?language=en-US&page=1`;
const popularSeriesUrl = `${BASE_URL}/tv/popular?language=en-US&page=1`;
const popularCartoonUrl = `${BASE_URL}/discover/movie?with_genres=16&language=en-US`;
const weeklyTopUrl = `${BASE_URL}/trending/all/week?language=en-US`;

const Home = observer(() => {
    useEffect(() => {
        moviesStore.fetchData(popularFilmsUrl, 'popularFilms', 'movie');
        moviesStore.fetchData(popularSeriesUrl, 'popularSeries', 'tv');
        moviesStore.fetchData(popularCartoonUrl, 'cartoonFilms', 'movie');
        moviesStore.fetchData(weeklyTopUrl, 'weeklyFilms', 'movie');
    }, []);

    return (
        <div>
            <H2>Wekly top</H2>
            <FilmCarusel
                data={moviesStore.weeklyFilms}
                type="movie"
            ></FilmCarusel>
            <H2>Popular Movies</H2>
            <FilmCarusel
                data={moviesStore.popularFilms}
                type="movie"
            ></FilmCarusel>
            <H2>Popular Series</H2>
            <FilmCarusel
                data={moviesStore.popularSeries}
                type="tv"
            ></FilmCarusel>
            <H2>Cartoons</H2>
            <FilmCarusel
                data={moviesStore.cartoonFilms}
                type="movie"
            ></FilmCarusel>
        </div>
    );
});

export default Home;
