import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {movieActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MovieInfo} from "./MovieInfo";
import {LoadingSpinner} from "../LoadingContainer";

const Movie = () => {
    const {id} = useParams();

    const dispatch = useAppDispatch();
    const {movie, isLoading} = useAppSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieActions.setMovie());
        dispatch(movieActions.getById({id}))
    }, [id, dispatch]);

    return (
        <div>
            {isLoading && <LoadingSpinner/>}

            {movie && <MovieInfo movie={movie}/>}
        </div>
    );
};

export {
    Movie
}