import { Link } from 'react-router-dom';
import PersonsGridSkeleton from '../../ui/Skeletons/PersonsGridSkeleton';

const PersonsGrid = ({ data, loading }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-4 md:gap-y-8">
            {data.map((item) => (
                <Link
                    to={`/persons/${item.id}`}
                    key={item.id}
                    className="bg-white/10 overflow-hidden rounded-2xl relative group"
                >
                    {item.profile_path ? (
                        <div className="overflow-hidden">
                            <img
                                className="w-full aspect-2/3 object-cover group-hover:scale-110 transition-transform"
                                src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`}
                                alt=""
                            />
                        </div>
                    ) : (
                        <div className="aspect-2/3 uppercase text-center content-center bg-violet-900">
                            no <br /> title
                        </div>
                    )}
                    <div className="p-4 flex items-baseline gap-4">
                        {item.name}
                    </div>
                </Link>
            ))}
            {loading &&
                Array(20)
                    .fill(0)
                    .map((_, index) => <PersonsGridSkeleton key={index} />)}
        </div>
    );
};

export default PersonsGrid;
