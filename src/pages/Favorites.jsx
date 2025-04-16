import React, { useEffect } from 'react';
import { H2 } from '../components/ui/Title/Title';
import Filmgrid from '../components/ui/FilmGrid/FilmGrid';
import { observer } from 'mobx-react-lite';
import { MdFavoriteBorder } from 'react-icons/md';

import favoriteStore from '../stores/favoriteStore';
import authStore from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
const Favorites = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.isAuth) navigate('/');
    }, [authStore.isAuth]);

    return (
        <>
            {favoriteStore.favorites?.length > 0 ? (
                <div>
                    <H2>Favorites</H2>
                    <Filmgrid
                        data={favoriteStore.favorites.map((item) => item.data)}
                    />
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
