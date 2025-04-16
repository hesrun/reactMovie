import { BASE_URL, GET_HEADER } from '../../constants/constants';
import { H2 } from '../../components/ui/Title/Title';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonsGrid from '../../components/ui/PersonsGrid/PersonsGrid';
import Button from '../../components/ui/Button/Button';
import PageError from '../../components/ui/Errors/PageError';

const Persons = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${BASE_URL}/person/popular?page=${page}`,
                GET_HEADER
            );
            setData([...data, ...response.data.results]);
        } catch (error) {
            setError(error.message || 'Something wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    if (error) {
        return <PageError>{error}</PageError>;
    }
    return (
        <>
            <H2>Popular Persons</H2>
            {data && (
                <>
                    <PersonsGrid data={data} loading={isLoading} />
                    <div className="mt-8 max-w-80 mx-auto">
                        <Button
                            onClick={() => setPage(page + 1)}
                            className="w-full"
                        >
                            {isLoading ? 'Loading...' : 'Show More'}
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default Persons;
