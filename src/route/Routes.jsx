import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Contacts from '../pages/Contacts';
import Favorites from '../pages/Favorites';
import NotFound from '../pages/NotFound';
import MoviesLayout from '../pages/Movies/MoviesLayout';
import Movie from '../pages/Movie/Movie';
import Movies from '../pages/Movies/Movies';
import Persons from '../pages/Persons/Persons';
import Person from '../pages/Person/Person';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
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
                element: <MoviesLayout />,
                children: [
                    { path: '', element: <Movies /> },
                    { path: 'on-air', element: <Movies /> },
                    { path: 'top', element: <Movies /> },
                    { path: ':id', element: <Movie type="tv" /> },
                ],
            },
            { path: '/persons', element: <Persons /> },
            { path: '/persons/:id', element: <Person /> },
            { path: '/favorite', element: <Favorites /> },
            { path: '/contacts', element: <Contacts /> },
            { path: '/*', element: <NotFound /> },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
