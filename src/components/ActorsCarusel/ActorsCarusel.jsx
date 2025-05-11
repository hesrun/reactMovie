import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import CaruselSkeleton from '../../ui/Skeletons/CaruselSkeleton';

const ActorsCarusel = ({ data, loading }) => {
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
                <div className="relative flex gap-4 overflow-auto c-scrollbar pb-4">
                    {data.map((item) => (
                        <Link
                            key={item.id}
                            to={`/persons/${item.id}`}
                            className="!w-55 block rounded-2xl overflow-hidden bg-white/10 group shrink-0"
                        >
                            <div className="aspect-2/3 overflow-hidden">
                                {item.profile_path ? (
                                    <img
                                        className="aspect-2/3 object-cover group-hover:scale-110 transition-transform"
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
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default ActorsCarusel;
