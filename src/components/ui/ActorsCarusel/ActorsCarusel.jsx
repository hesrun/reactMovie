import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import React, { useRef } from 'react';
import { CiUser } from 'react-icons/ci';

const ActorsCarusel = ({ data }) => {
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
                className="!pb-4"
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id} className="!w-45 md:!w-50">
                        <div className="overflow-hidden bg-gray-600 rounded-2xl">
                            <div className="aspect-2/3">
                                {item.profile_path ? (
                                    <img
                                        className="rounded-2xl"
                                        src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`}
                                        alt={item.original_name}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col justify-center items-center  gap-4 bg-black">
                                        <CiUser className="text-7xl" />
                                        <span className="uppercase text-sm">
                                            no photo
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="px-4 py-2">
                                <div className="text-sm md:text-lg">
                                    {item.name}
                                </div>
                                <span className="text-xs md:text-sm">
                                    {item.character}
                                </span>
                            </div>
                        </div>
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

export default ActorsCarusel;
