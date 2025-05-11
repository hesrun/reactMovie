import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CaruselSkeleton from '../../ui/Skeletons/CaruselSkeleton';

const FilmCarusel = ({ data, type, loading }) => {
    return (
        <>
            {loading ? (
                <div className="flex gap-[15px] overflow-hidden">
                    {Array(10)
                        .fill(0)
                        .map((_, index) => (
                            <CaruselSkeleton key={index} />
                        ))}
                </div>
            ) : (
                <div className="flex gap-4 overflow-auto c-scrollbar pb-4">
                    {data?.map((item) => (
                        <Link
                            key={item.id}
                            to={`${type}/${item.id}`}
                            className="!w-45 shrink-0 !h-auto block rounded-2xl overflow-hidden bg-white/10 relative h-full group"
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
                    ))}
                </div>
            )}
        </>
    );
};

export default FilmCarusel;
