import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { GiTheater } from 'react-icons/gi';
import { IoTimerOutline } from 'react-icons/io5';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const MoviesLayout = () => {
    const { id } = useParams();

    const activeLink = ({ isActive }) => {
        return isActive
            ? 'flex flex-[0_0_200px] md:flex-1 items-center justify-center gap-4 bg-gradient-to-l from-fuchsia-900 to-pink-900 p-2 md:p-4 rounded-xl'
            : 'flex flex-[0_0_200px] md:flex-1 items-center justify-center gap-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-2 md:p-4 rounded-xl';
    };

    return (
        <>
            {!id ? (
                <div className="mb-4 lg:mb-8 flex gap-4 overflow-auto">
                    <NavLink end to="." className={activeLink}>
                        <FaChartLine className="text-lg md:text-2xl" />
                        Popular
                    </NavLink>
                    <NavLink to="./now-playing" className={activeLink}>
                        <GiTheater className="text-lg md:text-2xl" />
                        Now Playing
                    </NavLink>
                    <NavLink to="./top" className={activeLink}>
                        <FaRankingStar className="text-lg md:text-2xl" />
                        Top Rated
                    </NavLink>
                    <NavLink to="./upcoming" className={activeLink}>
                        <IoTimerOutline className="text-lg md:text-2xl" />
                        Upcoming
                    </NavLink>
                </div>
            ) : (
                <></>
            )}

            <Outlet />
        </>
    );
};

export default MoviesLayout;
