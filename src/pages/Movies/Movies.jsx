import { BASE_URL } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moviesStore from '../../stores/appStore';
import FilmGrid from '../../components/ui/FilmGrid/FilmGrid';
import Button from '../../components/ui/Button/Button';
import { useLocation } from 'react-router-dom';
import { H2 } from '../../components/ui/Title/Title';

const Movies = observer(() => {
    const [page, setPage] = useState(1);
    const location = useLocation();

    let url = '';
    let title = '';
    let storeKey = '';
    let data = [];

    switch (location.pathname) {
        case '/movie':
            url = `${BASE_URL}/movie/popular`;
            storeKey = 'popularFilms';
            data = moviesStore.popularFilms;
            title = 'Popular Films';
            break;

        case '/movie/upcoming':
            url = `${BASE_URL}/movie/upcoming`;
            storeKey = 'upcomingFilms';
            data = moviesStore.upcomingFilms;
            title = 'Upcoming Films';
            break;

        case '/movie/top':
            url = `${BASE_URL}/movie/top_rated`;
            storeKey = 'topRatedFilms';
            data = moviesStore.topRatedFilms;
            title = 'Top Rated Films';
            break;

        case '/movie/now-playing':
            url = `${BASE_URL}/movie/now_playing`;
            storeKey = 'nowPlayingFilms';
            data = moviesStore.nowPlayingFilms;
            title = 'Now Playing Films';
            break;

        default:
            break;
    }

    useEffect(() => {
        setPage(1);
    }, [location.pathname]);

    useEffect(() => {
        moviesStore.fetchData(
            `${url}?page=${page}`,
            storeKey,
            'movie',
            page > 1
        );
    }, [page, location.pathname]);

    return (
        <>
            <H2>{title}</H2>
            <FilmGrid data={data} loading={moviesStore.isLoading} />
            <div className="mt-8 max-w-80 mx-auto">
                <Button onClick={() => setPage(page + 1)} className="w-full">
                    {moviesStore.isLoading ? 'Loading...' : 'Show More'}
                </Button>
            </div>
        </>
    );
});

export default Movies;
