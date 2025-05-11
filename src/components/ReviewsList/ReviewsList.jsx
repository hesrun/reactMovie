import React from 'react';
import { H2 } from '../../ui/Title/Title';
import { BiUser } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa6';
import dateFormat from '../../helpers/dateFormat';

const ReviewsList = ({ data }) => {
    return (
        <>
            <H2>Reviews</H2>
            <div className="space-y-4 mb-4">
                {data?.map((item) => (
                    <div key={item.id} className="bg-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-950 rounded-full flex items-center justify-center overflow-hidden">
                                {item.author_details.avatar_path ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={`https://image.tmdb.org/t/p/original/${item.author_details.avatar_path}`}
                                        alt={item.author_details.name}
                                    />
                                ) : (
                                    <BiUser className="text-2xl" />
                                )}
                            </div>
                            <div className="">
                                <h4 className="font-medium">
                                    {item.author_details.name
                                        ? item.author_details.name
                                        : 'Unknown'}
                                </h4>
                                <span className="text-xs">
                                    Written on {dateFormat(item.created_at)}
                                </span>
                            </div>
                            <span className="inline-flex gap-2 bg-amber-500 items-center px-2 rounded-2xl leading-6 text-sm ml-auto">
                                <FaStar />
                                {item.author_details.rating}
                            </span>
                        </div>
                        <article className="mt-4 pt-4 border-t-white/10 border-t">
                            {item.content}
                        </article>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ReviewsList;
