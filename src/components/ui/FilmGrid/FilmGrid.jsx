import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FilmGrid = ({ data }) => {
    console.log(data);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-4 md:gap-y-8">
            {data.map((item) => (
                <Link
                    to={`/${item.type}/${item.id}`}
                    key={item.id}
                    className="bg-white/10 overflow-hidden rounded-2xl relative group"
                >
                    {item.poster_path ? (
                        <div className="overflow-hidden">
                            <img
                                className="w-full aspect-2/3 object-cover group-hover:scale-110 transition-transform"
                                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                                alt=""
                            />
                        </div>
                    ) : (
                        <div className="aspect-2/3 uppercase text-center content-center bg-violet-900">
                            no <br /> title
                        </div>
                    )}
                    <div className="p-4 flex items-baseline gap-4">
                        <h2 className="text-sm font-medium md:text-lg grow">
                            {item.type === 'movie' ? item.title : item.name}
                        </h2>
                        <span className="text-gray-400 text-sm">
                            {item.type === 'movie'
                                ? item.release_date?.split('-')[0]
                                : item.first_air_date?.split('-')[0]}
                            {}
                        </span>
                    </div>
                    <span className="absolute top-2 right-2 bg-gray-900 text-xs flex items-center rounded-2xl py-1 px-2 gap-1">
                        <FaStar className="text-orange-400" />
                        {item.vote_average.toFixed(1)}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default FilmGrid;
