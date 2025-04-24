import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';
import { GiTheater } from 'react-icons/gi';
import { IoTimerOutline } from 'react-icons/io5';
import { IoIosRadio } from 'react-icons/io';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

const MoviesLayout = () => {
    const { id } = useParams();
    const location = useLocation();

    const activeLink = ({ isActive }) => {
        return isActive
            ? 'flex flex-[0_0_200px] md:flex-1 items-center justify-center gap-4 bg-gradient-to-l from-fuchsia-900 to-pink-900 p-2 md:p-4 rounded-xl'
            : 'flex flex-[0_0_200px] md:flex-1 items-center justify-center gap-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-2 md:p-4 rounded-xl';
    };

    return (
        <>
            {!id ? (
                <>
                    {location.pathname.includes('/movie') ? (
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
                    ) : null}
                    {location.pathname.includes('/tv') ? (
                        <div className="mb-4 lg:mb-8 flex gap-4 overflow-auto">
                            <NavLink end to="." className={activeLink}>
                                <FaChartLine className="text-lg md:text-2xl" />
                                Popular
                            </NavLink>
                            <NavLink to="./on-air" className={activeLink}>
                                <IoIosRadio className="text-lg md:text-2xl" />
                                On The Air
                            </NavLink>
                            <NavLink to="./top" className={activeLink}>
                                <FaRankingStar className="text-lg md:text-2xl" />
                                Top Rated
                            </NavLink>
                        </div>
                    ) : null}
                </>
            ) : (
                <></>
            )}
            <Outlet />
        </>
    );
};

export default MoviesLayout;
