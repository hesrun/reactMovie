import { observer } from 'mobx-react-lite';
import moviesStore from '../stores/appStore';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import Search from './ui/Search/Search';

const Header = observer(() => {
    const [menuOpen, setMenuOpen] = useState(false);

    const getNavLinkClass = ({ isActive }) =>
        `hover:text-red-600 text-2xl md:text-base ${
            isActive ? 'text-red-600' : 'text-white'
        }`;

    const menuOpenHandler = () => {
        setMenuOpen(!menuOpen);
    };

    const menuOpenClass = () => {
        return !menuOpen ? '-translate-x-full ' : 'translate-x-0';
    };
    menuOpenClass();

    return (
        <header className="sticky top-0 z-20 bg-indigo-950 ">
            <div className="container mx-auto flex h-[50px] md:h-[70px] items-center gap-4 relative px-4">
                <button
                    onClick={menuOpenHandler}
                    className="text-2xl md:hidden"
                >
                    {!menuOpen ? <IoMenuOutline /> : <IoMdClose />}
                </button>
                <Link to="/">
                    <svg
                        viewBox="0 0 369.89473684210526 66.16466023679334"
                        height="20px"
                    >
                        <defs id="SvgjsDefs1029"></defs>
                        <g
                            id="SvgjsG1030"
                            featurekey="UFHKJ9-0"
                            transform="matrix(0.926532997348788,0,0,0.926532997348788,-10.609499811781827,-20.27647637032249)"
                            fill="white"
                        >
                            <g xmlns="http://www.w3.org/2000/svg" fill="white">
                                <path d="M61.15 28.36q28.29 0 32.21.03 5.19.04 7.01 1.36 2.72 1.97 2.71 6.49-.01 30.34-.04 36.01-.01.9-.56 2.57a.41.41 0 0 0 .39.54q.04 0 1.11-.33c2.36-.71 4.96.58 6.05 2.42 2.27 3.85-.41 8.02-4.53 8.92a1.91.84 15.8 0 1-.21.03q-.52.05-44.13.05-43.62 0-44.14-.05a1.91.84-15.8 0 1-.21-.03c-4.12-.9-6.8-5.07-4.53-8.92 1.09-1.84 3.69-3.13 6.05-2.42q1.07.33 1.11.33a.41.41 0 0 0 .39-.54q-.55-1.67-.56-2.57-.03-5.67-.04-36.01-.01-4.52 2.71-6.49 1.82-1.32 7.01-1.36 3.92-.03 32.2-.03m38.332 7.127a3.47 3.47 0 0 0-3.464-3.476l-69.74-.122a3.47 3.47 0 0 0-3.476 3.464l-.064 36.38a3.47 3.47 0 0 0 3.464 3.476l69.74.122a3.47 3.47 0 0 0 3.476-3.464zM61.11 78.96q-29.87 0-34.86.09-5.07.08-9.56-.54a1.55 1.55 0 0 0-1.71 1.95l.1.38a2.63 2.63 0 0 0 2.54 1.94q22.6 0 43.49.02 20.9-.02 43.49-.02a2.63 2.63 0 0 0 2.54-1.94l.1-.38a1.55 1.55 0 0 0-1.71-1.95q-4.49.62-9.56.54-4.99-.09-34.86-.09"></path>
                                <path d="m53.15 39.51 22.5 12.72a2.12 2.12 0 0 1-.03 3.71L52.85 68.19a2.12 2.12 0 0 1-3.13-1.89l.26-24.96a2.12 2.12 0 0 1 3.17-1.83m17.42 14.87a.33.33 0 0 0 .01-.57l-16.51-9.69a.33.33 0 0 0-.5.29l.18 18.6a.33.33 0 0 0 .49.29z"></path>
                            </g>
                        </g>
                        <g
                            id="SvgjsG1031"
                            featurekey="XAPJzK-0"
                            transform="matrix(4.7123525067610315,0,0,4.7123525067610315,105.40270491761721,-28.132741229647678)"
                            fill="white"
                        >
                            <path d="M6.26 11.94 l0 -5.48 c0 -0.6 2.3 -0.6 2.3 0 l0 13.1 c0 0.6 -2.3 0.6 -2.3 0 l0 -5.36 l-2.58 0 l0 5.36 c0 0.6 -2.28 0.6 -2.28 0 l0 -13.1 c0 -0.6 2.28 -0.6 2.28 0 l0 5.48 l2.58 0 z M13.64 17.72 l2.86 0 c0.6 0 0.6 2.28 0 2.28 l-3.86 0 c-1.28 0 -1.28 0 -1.28 -1.08 l0 -11.84 c0 -1.08 0 -1.08 1.22 -1.1 l3.9 0.02 c0.6 0 0.6 2.28 0 2.28 l-2.84 0 l0 3.64 l2 0 c0.6 0 0.6 2.3 0 2.3 l-2 0 l0 3.5 z M26.06 16.42 c0.04 0.68 -0.14 1.44 -0.52 2 c-0.18 0.26 -0.38 0.52 -0.64 0.74 c-0.16 0.12 -0.32 0.26 -0.5 0.36 s-0.38 0.18 -0.56 0.26 c-0.6 0.26 -1.32 0.28 -1.94 0.12 c-0.32 -0.08 -0.62 -0.2 -0.9 -0.38 c-0.26 -0.16 -0.54 -0.36 -0.74 -0.6 c-0.22 -0.24 -0.42 -0.5 -0.56 -0.8 c-0.08 -0.18 -0.18 -0.38 -0.24 -0.58 c-0.04 -0.2 -0.1 -0.72 -0.1 -0.92 c0 -0.6 2.24 -0.6 2.24 0 c0 0.5 0.78 1.84 1.98 0.64 c0.5 -0.72 0.04 -1.54 -0.4 -2.14 c-0.68 -0.84 -1.56 -1.48 -2.28 -2.28 c-0.42 -0.46 -0.84 -0.98 -1.1 -1.56 c-0.14 -0.32 -0.26 -0.64 -0.34 -1 c-0.3 -1.66 0.22 -4.62 3.84 -4.28 c1.82 0.18 2.62 1.74 2.62 2.8 c0 0.6 -2.28 0.6 -2.28 0 c0 -0.8 -2.26 -0.9 -1.98 0.86 c0.04 0.18 0.08 0.36 0.16 0.54 c0.12 0.26 0.26 0.48 0.42 0.7 c0.2 0.26 0.4 0.48 0.64 0.7 c0.88 0.86 1.88 1.64 2.52 2.74 c0.38 0.64 0.6 1.34 0.66 2.08 z M29.6 6 l4 0 c0.6 0 0.6 2.28 0 2.28 l-2.86 0 l0 3.64 l2 0 c0.6 0 0.6 2.3 0 2.3 l-2 0 l0 5.34 c0 0.6 -2.28 0.6 -2.28 0 l0 -12.46 c0 -1.1 0 -1.1 1.14 -1.1 z M38.74 17.740000000000002 l2.88 0 c0.4 0 0.4 2.26 0 2.26 l-4.02 0 c-1.14 0 -1.14 0 -1.14 -1.1 l0 -12.44 c0 -0.4 2.28 -0.4 2.28 0 l0 11.28 z M44.32 19.56 l0 -13.14 c0 -0.6 2.28 -0.6 2.28 0 l0 13.14 c0 0.6 -2.28 0.6 -2.28 0 z M52.56 10.06 l1.4 -3.86 c0.18 -0.48 2.44 0.02 2.14 0.84 l-2.3 6.16 l2.14 5.78 c0.3 0.84 -1.94 1.32 -2.12 0.84 l-1.26 -3.5 l-1.24 3.5 c-0.18 0.46 -2.48 0.04 -2.14 -0.84 l2.14 -5.78 l-2.28 -6.14 c-0.34 -0.92 1.94 -1.42 2.14 -0.84 z"></path>
                        </g>
                    </svg>
                </Link>
                <div
                    className={`fixed bg-indigo-950  top-[50px] left-0 bottom-0 z-100 md:z-auto w-full max-w-[300px] p-8 ${menuOpenClass()} transition-transform md:transition-none md:translate-x-0 md:static md:p-0 md:ml-8`}
                >
                    <div className="flex flex-col gap-4 md:flex-row">
                        <NavLink
                            onClick={() => setMenuOpen(false)}
                            to="/"
                            className={getNavLinkClass}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            onClick={() => setMenuOpen(false)}
                            to="/movie"
                            className={getNavLinkClass}
                        >
                            Movies
                        </NavLink>
                        <NavLink
                            onClick={() => setMenuOpen(false)}
                            to="/tv"
                            className={getNavLinkClass}
                        >
                            Series
                        </NavLink>
                    </div>
                </div>
                <Link
                    to="/favorite"
                    className="text-2xl ml-auto relative hover:text-red-700"
                >
                    {moviesStore.favorite.length > 0 ? (
                        <>
                            <MdFavorite className="text-red-700" />
                            <span className="text-xs absolute bg-red-400 w-4 h-4 rounded-full text-center -right-2 -top-1">
                                {moviesStore.favorite.length}
                            </span>
                        </>
                    ) : (
                        <MdFavoriteBorder />
                    )}
                </Link>
                <Search />
            </div>
        </header>
    );
});

export default Header;
