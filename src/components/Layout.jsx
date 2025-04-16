import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import AuthModal from './AuthModal/AuthModal';
import authStore from '../stores/authStore';
import { useEffect } from 'react';

const Layout = () => {
    useEffect(() => {
        authStore.checkAuth();
    }, []);
    return (
        <>
            <Header></Header>
            <main className="grow container mx-auto py-4 lg:py-8 px-4">
                <Outlet />
            </main>
            {/* <Footer /> */}
            <AuthModal />
        </>
    );
};

export default Layout;
