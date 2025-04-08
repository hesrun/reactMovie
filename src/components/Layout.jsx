import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header></Header>
            <main className="grow container mx-auto py-4 lg:py-8 px-4">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default Layout;
