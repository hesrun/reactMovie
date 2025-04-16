import React, { useEffect, useState } from 'react';
import Button from '../ui/Button/Button';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import modalStore from '../../stores/modalStore';
import { IoMdClose } from 'react-icons/io';

const AuthModal = observer(() => {
    const [signType, setSignType] = useState(true);
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [validateErrors, setValidateErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!user.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!user.password) {
            errors.password = 'Password is required';
        } else if (user.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        setValidateErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const changeModalType = () => {
        setSignType((prev) => !prev);
        setUser({
            username: '',
            password: '',
        });
        authStore.setError('');
        setValidateErrors({});
    };

    const register = (e) => {
        e.preventDefault();
        if (!validate()) return;
        authStore.toRegister(user.username, user.password);
        setUser({
            username: '',
            password: '',
        });
    };

    const signIn = (e) => {
        e.preventDefault();
        if (!validate()) return;
        authStore.toLogin(user.username, user.password);
        setUser({
            username: '',
            password: '',
        });
    };

    useEffect(() => {
        if (modalStore.isOpen) {
            setSignType(true);
        }
    }, [modalStore.isOpen]);

    useEffect(() => {
        if (authStore.isAuth) {
            modalStore.closeModal();
        }
    }, [authStore.isAuth]);

    return (
        modalStore.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xl">
                <form
                    onSubmit={signType ? register : signIn}
                    className="relative bg-indigo-950 w-full max-w-[500px] px-8 py-8 rounded-2xl"
                >
                    <button
                        type="button"
                        onClick={() => modalStore.closeModal()}
                    >
                        <IoMdClose className="absolute right-4 top-4 text-2xl hover:opacity-50 cursor-pointer" />
                    </button>
                    <div className="text-2xl text-center mb-8">
                        {signType ? 'Create Account' : 'Log in'}
                    </div>
                    <div className="space-y-4">
                        <input
                            className="w-full border border-white/20 rounded-md px-4 py-2 focus:border-white/60 outline-0"
                            type="text"
                            name="username"
                            placeholder="User name"
                            onChange={handleChange}
                            value={user.username}
                        />
                        <input
                            className="w-full border border-white/20 rounded-md px-4 py-2 focus:border-white/60 outline-0"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={user.password}
                        />
                    </div>
                    {authStore.error && (
                        <div className="bg-red-400 rounded-2xl py-1 px-4 mt-8">
                            {authStore.error}
                        </div>
                    )}
                    {Object.keys(validateErrors).length > 0 && (
                        <div className="bg-red-400 rounded-2xl py-1 px-4 mt-8">
                            {validateErrors.username && (
                                <div>{validateErrors.username}</div>
                            )}
                            {validateErrors.password && (
                                <div>{validateErrors.password}</div>
                            )}
                        </div>
                    )}
                    <div className="mt-8 flex flex-col gap-8">
                        <Button type="submit" className="w-full">
                            {authStore.isLoading ? 'Loading... ' : 'Send '}
                        </Button>
                        <button
                            type="button"
                            className="opacity-60 uppercase font-medium cursor-pointer hover:opacity-100"
                            onClick={changeModalType}
                        >
                            {signType
                                ? 'Already have an account'
                                : 'Create an account'}
                        </button>
                    </div>
                </form>
            </div>
        )
    );
});

export default AuthModal;
