import {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {GenreBadge} from "./GenreBadge";
import {LoadingSpinner} from "../LoadingContainer";
import css from './Genre.module.css';


const Genres = () => {

    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme);


    const {genres, isLoading} = useAppSelector(state => state.genre);

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch]);

    return (
        <div>
            {isLoading && <LoadingSpinner/>}

            <div className={css.Container}>
                <div className={theme ? css.BlockLight : css.BlockDark}>
                    <div className={css.Genres}>
                        {genres.map(genre => <GenreBadge key={genre.id} genre={genre}/>)}
                    </div>
                </div>
            </div>
        </div>

    );
};

export {
    Genres
};