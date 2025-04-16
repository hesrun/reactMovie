import axios from 'axios';
import { makeAutoObservable, autorun } from 'mobx';
import favoriteStore from './favoriteStore';
const USERS_URL = 'https://67f960f7094de2fe6ea15e22.mockapi.io/users';

class AuthStore {
    user = null;
    isAuth = false;
    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
        autorun(() => {
            if (this.user) {
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.removeItem('user');
            }
        });
    }

    async toLogin(username, password) {
        this.setLoading(true);
        try {
            const response = await axios.get(USERS_URL);
            const user = response.data.find(
                (user) =>
                    user.username === username && user.password === password
            );
            if (user) {
                this.setUser(user);
            } else {
                this.setError('Wrong name or password');
            }
        } catch (error) {
            this.setError('Error on login');
        } finally {
            this.setLoading(false);
        }
    }

    async toRegister(username, password) {
        this.setLoading(true);
        try {
            const response = await axios.get(USERS_URL);
            const exist = response.data.find((u) => u.username === username);
            if (exist) {
                this.setError(
                    'User is exist, try to login or use another name'
                );
            } else {
                const newUser = await axios.post(USERS_URL, {
                    username,
                    password,
                });
                this.setUser(newUser.data);
            }
        } catch (error) {
            this.setError('Registration Error');
        } finally {
            this.setLoading(false);
        }
    }

    checkAuth() {
        const stored = localStorage.getItem('user');
        if (stored) {
            const userData = JSON.parse(stored);
            if (userData) {
                this.setUser(userData);
            }
        }
    }

    logOut() {
        this.user = null;
        this.isAuth = false;
        localStorage.removeItem('user');
    }

    setUser(user) {
        this.user = user;
        this.isAuth = true;
        this.error = '';
        favoriteStore.getFavorites(this.user.id);
    }

    setError(message) {
        this.error = message;
    }

    setLoading(value) {
        this.isLoading = value;
    }
}

const authStore = new AuthStore();

export default authStore;
