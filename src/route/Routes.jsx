import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Favorites from '../pages/Favorites';
import Series from '../pages/Series/Series';
import SeriesLayout from '../pages/Series/SeriesLayout';
import NotFound from '../pages/NotFound';
import MoviesLayout from '../pages/Movies/MoviesLayout';
import Movie from '../pages/Movie/Movie';
import Movies from '../pages/Movies/Movies';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/contacts', element: <Contacts /> },
            {
                path: '/movie',
                element: <MoviesLayout />,
                children: [
                    { path: '', element: <Movies /> },
                    { path: 'now-playing', element: <Movies /> },
                    { path: 'top', element: <Movies /> },
                    { path: 'upcoming', element: <Movies /> },
                    { path: ':id', element: <Movie type="movie" /> },
                ],
            },
            {
                path: '/tv',
                element: <SeriesLayout />,
                children: [
                    { path: '', element: <Series /> },
                    { path: 'on-air', element: <Series /> },
                    { path: 'top', element: <Series /> },
                    { path: ':id', element: <Movie type="tv" /> },
                ],
            },
            { path: '/favorite', element: <Favorites /> },
            { path: '/*', element: <NotFound /> },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
