import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import {PosterPreview} from "./PosterPreview";
import {StarsRating} from "./StarsRating";
import css from './Movies.module.css';

interface IProps {
    movie: IMovie
}

const MoviesListCard: FC<IProps> = ({movie}) => {
    const {original_title, poster_path, vote_average, id} = movie;

    const {theme} = useAppSelector(state => state.theme);

    const navigate = useNavigate();

    return (
        <div className={css.MovieContainer}>
            <div className={theme ? css.MovieLight : css.MovieDark} onClick={() => navigate(`/movies/${id}`)}>

                <PosterPreview original_title={original_title} poster_path={poster_path} size={`185`}/>
                <p> {original_title} </p>
                <StarsRating vote_average={vote_average} size={22}/>

            </div>
        </div>
    );
};

export {
    MoviesListCard
}