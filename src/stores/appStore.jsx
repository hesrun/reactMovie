import { API_KEY } from '../constants/constants';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const headerGet = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

class MoviesStore {
    favorite = [];
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

    addToFavorite(data, type) {
        const exists = this.favorite.some((item) => item.id === data.id);
        if (!exists) {
            const item = {
                ...data,
                type: type,
            };
            this.favorite.push(item);
        }
    }

    removeFromFavorite(id) {
        this.favorite = this.favorite.filter((item) => item.id !== id);
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
            const response = await axios.get(url, headerGet);
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
