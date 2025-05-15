import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import Publications from './pages/Publications'
import DetailsPublication from './pages/DetailsPublication'
import Layout from './components/Layout'

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'publications',
                element: <Publications />
            },
            {
                path: 'publications/:id',
                element: <DetailsPublication />
            }
        ]
    }
]
