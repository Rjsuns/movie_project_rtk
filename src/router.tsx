import {createBrowserRouter, Navigate} from "react-router-dom";

import {ErrorPage, GenresPage, MoviePage, MoviesByGenrePage, MoviesPage, SearchPage} from "./pages";
import {MainLayout} from "./layouts";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [
            {
                index: true, element: <Navigate to={'movies'}/>
            },
            {
                path: 'movies', element: <MoviesPage/>,
            },
            {
                path: 'movies/:id', element: <MoviePage/>
            },
            {
                path: 'genres', element: <GenresPage/>
            },
            {
                path: 'genres/:id', element: <MoviesByGenrePage/>
            },
            {
                path: 'search', element: <SearchPage/>
            }
        ]
    }
])

export {
    router
}