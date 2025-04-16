import axios from 'axios';
import { makeAutoObservable } from 'mobx';

const FAVORITES_URL = (userId, favoriteId = false) => {
    return favoriteId
        ? `https://67f960f7094de2fe6ea15e22.mockapi.io/users/${userId}/favorites/${favoriteId}`
        : `https://67f960f7094de2fe6ea15e22.mockapi.io/users/${userId}/favorites`;
};

class FavoriteStore {
    favorites = [];
    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async getFavorites(userId) {
        this.setLoading(true);
        try {
            const response = await axios.get(FAVORITES_URL(userId));
            if (response.data.length > 0) {
                this.setFavorites(response.data);
            }
        } catch (error) {
            this.setError('Error fetching favorites');
        } finally {
            this.setLoading(false);
        }
    }

    async addFavorite(userId, favoriteId, data, type) {
        const exists = this.favorites.some(
            (item) => item.favoriteId === favoriteId
        );
        if (exists) {
            this.setError('Already in favorites');
            return;
        }
        this.setLoading(true);
        try {
            const newItem = await axios.post(FAVORITES_URL(userId), {
                userId,
                favoriteId,
                data: {
                    ...data,
                    type,
                },
            });
            this.setFavorites([...this.favorites, newItem.data]);
        } catch (error) {
            this.setError('Error adding favorite');
        } finally {
            this.setLoading(false);
        }
    }

    async removeFavorite(userId, favoriteId) {
        const removeId = this.favorites.find(
            (item) => item.favoriteId === favoriteId
        ).id;
        if (!removeId) {
            this.setError('No longer in favorites');
            return;
        }
        this.setLoading(true);
        try {
            await axios.delete(FAVORITES_URL(userId, removeId));
            this.setFavorites(
                this.favorites.filter((item) => item.favoriteId !== favoriteId)
            );
        } catch (error) {
            this.setError('Error removing from favorite');
        } finally {
            this.setLoading(false);
        }
    }

    setFavorites(favorites) {
        this.favorites = favorites;
        this.error = '';
    }

    setError(message) {
        this.error = message;
    }

    setLoading(value) {
        this.isLoading = value;
    }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;
