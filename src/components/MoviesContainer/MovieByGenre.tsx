import {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {MoviesListCard} from "./MovieListCard";
import {LoadingSpinner} from "../LoadingContainer";
import {Pagination} from "../PaginationContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import css from './Movies.module.css';

const MoviesByGenre = () => {
    const {id} = useParams();

    const dispatch = useAppDispatch();

    const {isLoading, movies, totalPages} = useAppSelector(state => state.movie);
    const {selectedGenre} = useAppSelector(state => state.genre);
    const {theme} = useAppSelector(state => state.theme);

    const [query, setQuery] = useSearchParams({page: "1"})
    const page: string = query.get('page');

    useEffect(() => {
        if (id !== undefined) {
            dispatch(movieActions.setMovies());
            dispatch(movieActions.getAll({page, genreId: id}))
        }
    }, [id, page, dispatch]);

    return (
        <div>
            {isLoading && <LoadingSpinner/>}

            <div className={theme ? css.GenreHeaderLight : css.GenreHeaderDark}><h1><FontAwesomeIcon
                icon={faFilm}/> {selectedGenre}</h1></div>

            <div className={css.Movies}>
                {movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)}
            </div>

            <div>
                <Pagination setQuery={setQuery} page={page} totalPages={totalPages}/>
            </div>

        </div>
    );
};

export {
    MoviesByGenre
}