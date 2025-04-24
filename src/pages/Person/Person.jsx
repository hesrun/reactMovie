import { BASE_URL, GET_HEADER } from '../../constants/constants';
import { H1, H2 } from '../../components/ui/Title/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageError from '../../components/ui/Errors/PageError';
import { CiUser } from 'react-icons/ci';
import { RiMovie2AiLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const creditType = {
    movie: '/movie/',
    tv: '/tv/',
};

const Person = () => {
    const [collapseText, setCollapseText] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [person, setPerson] = useState([]);
    const [credits, setCredits] = useState(null);
    let params = useParams();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [personData, creditsData] = await Promise.all([
                axios.get(`${BASE_URL}/person/${params.id}`, GET_HEADER),
                axios.get(
                    `${BASE_URL}/person/${params.id}/combined_credits`,
                    GET_HEADER
                ),
            ]);
            setPerson(personData.data);
            setCredits(creditsData.data);
        } catch (error) {
            setError(error.message || 'Something wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (string) => {
        const date = new Date(string);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return `${formattedDate}`;
    };

    const sortedFilms = credits?.cast
        .filter((item) => item.title?.length > 0)
        .sort((a, b) => {
            const hasDateA = !!a.release_date;
            const hasDateB = !!b.release_date;

            if (!hasDateA && hasDateB) return -1;
            if (hasDateA && !hasDateB) return 1;
            if (!hasDateA && !hasDateB) return 0;

            const yearA = parseInt(a.release_date.split('-')[0]);
            const yearB = parseInt(b.release_date.split('-')[0]);
            return yearB - yearA;
        });

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return <PageError>{error}</PageError>;
    }

    return (
        <>
            <div>
                {isLoading ? (
                    <div>
                        <div className="-mt-4 grid gap-4 md:mt-0 md:gap-16 md:grid-cols-12">
                            <div className="-mx-4 md:col-span-6 sm:mx-0 xl:col-span-4">
                                <Skeleton
                                    className="!block aspect-2/3"
                                    baseColor="rgba(67, 56, 202, 0.2)"
                                    highlightColor="rgba(129, 140, 248, 0.3)"
                                    inline={true}
                                />
                            </div>
                            <div className="md:col-span-6 xl:col-span-8">
                                <div className="mb-4 md:mb-6">
                                    <Skeleton
                                        className="!block h-8 max-w-100"
                                        baseColor="rgba(67, 56, 202, 0.2)"
                                        highlightColor="rgba(129, 140, 248, 0.3)"
                                        inline={true}
                                    />
                                </div>
                                <div className="mb-4 md:mb-6">
                                    <Skeleton
                                        className="h-2 max-w-10/12"
                                        baseColor="rgba(67, 56, 202, 0.2)"
                                        highlightColor="rgba(129, 140, 248, 0.3)"
                                    />
                                    <Skeleton
                                        className="h-2 max-w-8/12"
                                        baseColor="rgba(67, 56, 202, 0.2)"
                                        highlightColor="rgba(129, 140, 248, 0.3)"
                                    />
                                    <Skeleton
                                        className="h-2 max-w-6/12"
                                        baseColor="rgba(67, 56, 202, 0.2)"
                                        highlightColor="rgba(129, 140, 248, 0.3)"
                                    />
                                </div>
                                <div className="mb-4 md:mb-8 flex flex-wrap gap-4">
                                    {Array(6)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Skeleton
                                                className="!block h-10 aspect-2/1"
                                                baseColor="rgba(67, 56, 202, 0.2)"
                                                highlightColor="rgba(129, 140, 248, 0.3)"
                                                inline={true}
                                                key={index}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 -mt-4 sm:mt-0 md:grid-cols-12 md:gap-16">
                        <div className="-mx-4 sm:mx-0 sm:max-w-1/2 sm:mx-auto md:max-w-full md:mx-0 md:col-span-6 xl:col-span-4">
                            {person.profile_path ? (
                                <img
                                    className="w-full md:rounded-2xl"
                                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                                    alt=""
                                />
                            ) : (
                                <div className="aspect-2/3 bg-indigo-500/30 md:rounded-2xl flex">
                                    <CiUser className="m-auto text-6xl lg:text-8xl opacity-30" />
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-6 xl:col-span-8">
                            <H1>{person.name}</H1>
                            <div className="mb-8">
                                <div className="mb-2">
                                    {person.biography?.length > 700 &&
                                    collapseText
                                        ? person.biography.slice(0, 700) + '...'
                                        : person.biography}
                                </div>
                                {person.biography?.length > 700 && (
                                    <button
                                        onClick={() =>
                                            setCollapseText(!collapseText)
                                        }
                                        className="cursor-pointer text-red-500 underline hover:text-red-500/70"
                                    >
                                        {collapseText
                                            ? 'Show more'
                                            : 'Show less'}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Known For
                                    </span>
                                    <div>{person.known_for_department}</div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Gender
                                    </span>
                                    <div>
                                        {person.gender === 1
                                            ? 'Female'
                                            : 'Male'}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Birthday
                                    </span>
                                    <div>{formatDate(person.birthday)}</div>
                                </div>
                                {person.place_of_birth && (
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm">
                                            Place of Birth
                                        </span>
                                        <div>{person.place_of_birth}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <H2>
                    {isLoading ? (
                        <Skeleton
                            className="!block h-8 max-w-100"
                            baseColor="rgba(67, 56, 202, 0.2)"
                            highlightColor="rgba(129, 140, 248, 0.3)"
                            inline={true}
                        />
                    ) : (
                        `Films With ${person.name}`
                    )}
                </H2>

                {isLoading ? (
                    <div className="flex flex-col space-y-3.5">
                        {Array(10)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    className="!block h-24"
                                    baseColor="rgba(67, 56, 202, 0.2)"
                                    highlightColor="rgba(129, 140, 248, 0.3)"
                                    inline={true}
                                    key={index}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="relative before:absolute before:top-10 before:bottom-10 before:left-8 before:md:left-12 before:w-1 before:bg-violet-800">
                        {sortedFilms?.map((item) => (
                            <Link
                                to={`${creditType[item.media_type]}${item.id}`}
                                key={item.id}
                                className="relative z-[1] flex items-center gap-x-8 hover:bg-white/5 py-2 md:p-4 rounded-xl transition duration-300"
                            >
                                <div className="text-md bg-violet-800 px-4 py-1 rounded-full">
                                    {item.release_date
                                        ? item.release_date?.split('-')[0]
                                        : 'Soon'}
                                </div>
                                {item.poster_path ? (
                                    <img
                                        className="w-[50px] rounded-md "
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt=""
                                    />
                                ) : (
                                    <div className="w-[50px] aspect-2/3 bg-violet-800 rounded-md flex shrink-0">
                                        <RiMovie2AiLine className="m-auto" />
                                    </div>
                                )}
                                <div>
                                    "{item.title}"
                                    <div className="text-white/50">
                                        as {item.character}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Person;
