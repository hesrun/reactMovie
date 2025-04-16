import { makeAutoObservable } from 'mobx';
import { GET_HEADER } from '../constants/constants';
import axios from 'axios';

class MoviesStore {
    popularFilms = [];
    nowPlayingFilms = [];
    topRatedFilms = [];
    upcomingFilms = [];
    weeklyFilms = [];

    popularSeries = [];
    onAirSeries = [];
    topRatedSeries = [];

    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchData(url, storeKey, type, append = false) {
        if (
            ![
                'popularFilms',
                'nowPlayingFilms',
                'topRatedFilms',
                'upcomingFilms',
                'weeklyFilms',

                'popularSeries',
                'onAirSeries',
                'topRatedSeries',
                'weeklySeries',
            ].includes(storeKey)
        ) {
            console.error(`Invalid type: ${storeKey}`);
            return;
        }

        try {
            this.isLoading = true;
            const response = await axios.get(url, GET_HEADER);
            const resultsWithType = response.data.results.map((item) => ({
                ...item,
                type,
            }));

            this[storeKey] = append
                ? [...this[storeKey], ...resultsWithType]
                : resultsWithType;
        } catch (error) {
            this.error = error.message || `Error fetching ${storeKey}`;
        } finally {
            this.isLoading = false;
        }
    }
}

const moviesStore = new MoviesStore();
export default moviesStore;
