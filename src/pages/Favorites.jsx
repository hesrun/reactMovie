import React from 'react';
import { H2 } from '../components/ui/Title/Title';
import Filmgrid from '../components/ui/FilmGrid/FilmGrid';
import moviesStore from '../stores/appStore';
import { observer } from 'mobx-react-lite';

const Favorites = observer(() => {
    return (
        <div>
            <H2>Favorites</H2>
            <Filmgrid data={moviesStore.favorite} />
        </div>
    );
});

export default Favorites;
