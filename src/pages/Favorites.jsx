import React from 'react';
import { H2 } from '../components/ui/Title/Title';
import Filmgrid from '../components/ui/FilmGrid/FilmGrid';
import moviesStore from '../stores/appStore';
import { observer } from 'mobx-react-lite';
import { MdFavoriteBorder } from 'react-icons/md';

const Favorites = observer(() => {
    return (
        <>
            {moviesStore.favorite.length > 0 ? (
                <div>
                    <H2>Favorites</H2>
                    <Filmgrid data={moviesStore.favorite} />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh] ">
                    <MdFavoriteBorder className="text-8xl opacity-30 " />
                    <span className="uppercase tracking-wide">
                        You don't have favorite
                    </span>
                </div>
            )}
        </>
    );
});

export default Favorites;
