import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CaruselSkeleton = () => {
    return (
        <div className="!w-45 block rounded-2xl overflow-hidden bg-white/10 shrink-0">
            <Skeleton
                className="!block aspect-2/3"
                baseColor="rgba(67, 56, 202, 0.2)"
                highlightColor="rgba(129, 140, 248, 0.3)"
                inline={true}
            />
            <div className="px-4 py-2">
                <Skeleton
                    className="h-2"
                    inline={true}
                    baseColor="rgba(67, 56, 202, 0.2)"
                    highlightColor="rgba(129, 140, 248, 1)"
                />
            </div>
        </div>
    );
};

export default CaruselSkeleton;
