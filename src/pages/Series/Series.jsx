import { BASE_URL } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moviesStore from '../../stores/appStore';
import FilmGrid from '../../components/ui/FilmGrid/FilmGrid';
import Button from '../../components/ui/Button/Button';
import { useLocation } from 'react-router-dom';
import { H2 } from '../../components/ui/Title/Title';

const Series = observer(() => {
    const [page, setPage] = useState(1);
    const location = useLocation();

    let url = '';
    let title = '';
    let storeKey = '';
    let data = [];

    switch (location.pathname) {
        case '/tv':
            url = `${BASE_URL}/tv/popular`;
            storeKey = 'popularSeries';
            data = moviesStore.popularSeries;
            title = 'Popular TV Shows';
            break;

        case '/tv/on-air':
            url = `${BASE_URL}/tv/on_the_air`;
            storeKey = 'onAirSeries';
            data = moviesStore.onAirSeries;
            title = 'TV Shows Airing Today';
            break;

        case '/tv/top':
            url = `${BASE_URL}/tv/top_rated`;
            storeKey = 'topRatedSeries';
            data = moviesStore.topRatedSeries;
            title = 'Top Rated TV Show';
            break;

        default:
            break;
    }

    useEffect(() => {
        setPage(1);
    }, [location.pathname]);

    useEffect(() => {
        moviesStore.fetchData(`${url}?page=${page}`, storeKey, 'tv', page > 1);
    }, [page, location.pathname]);

    return (
        <>
            <H2>{title}</H2>
            <FilmGrid data={data} />
            <div className="mt-8 max-w-80 mx-auto">
                <Button onClick={() => setPage(page + 1)} className="w-full">
                    Show More
                </Button>
            </div>
        </>
    );
});

export default Series;
