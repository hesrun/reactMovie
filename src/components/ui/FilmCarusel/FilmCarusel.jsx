import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import React, { useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FilmCarusel = ({ data, type }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                slidesPerView={'auto'}
                spaceBetween={15}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id} className="!w-45">
                        <Link
                            to={`${type}/${item.id}`}
                            href=""
                            className="block rounded-2xl overflow-hidden bg-white/10 relative h-full group"
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
                            <div className="text-sm px-4 py-2">
                                <span>
                                    {item.title ? item.title : item.name}
                                </span>
                            </div>
                            <span className="absolute top-2 right-2 bg-gray-900 text-xs flex items-center rounded-2xl py-1 px-2 gap-1">
                                <FaStar className="text-orange-400" />
                                {item.vote_average.toFixed(1)}
                            </span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                ref={prevRef}
                className="absolute bg-gray-900 shadow-black z-10 left-0 p-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
                <BsArrowLeft />
            </button>
            <button
                ref={nextRef}
                className="absolute bg-gray-900 shadow-black z-10 right-0 p-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
                <BsArrowRight />
            </button>
        </div>
    );
};

export default FilmCarusel;
