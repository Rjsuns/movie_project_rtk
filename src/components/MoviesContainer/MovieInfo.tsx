import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {StarsRating} from "./StarsRating";
import {PosterPreview} from "./PosterPreview";
import css from './Movies.module.css';

interface IProps {
    movie: IMovie
}

const MovieInfo: FC<IProps> = ({movie}) => {
    const {
        original_title,
        poster_path,
        budget,
        genres,
        production_countries,
        runtime,
        vote_average,
        overview,
        release_date
    } = movie;

    const country = production_countries.length > 0 ? production_countries[0].name : '';

    const isBudget = budget > 0 ? budget : '';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {theme} = useAppSelector(state => state.theme);

    const moviesByGenre = (genreId: number, genreName: string) => {
        navigate(`/genres/${genreId}`);
        dispatch(genreActions.setSelectedGenre(genreName))
    }

    return (
        <div>
            <div className={css.MovieInfoContainer}>
                <div className={theme ? css.InnerContainerDark : css.InnerContainerLight}>
                    <div className={css.Poster}>
                        <PosterPreview original_title={original_title} poster_path={poster_path} size={'500'}/>

                        <div className={css.StarsRating}>
                            <StarsRating vote_average={vote_average} size={45}/>
                        </div>
                    </div>

                    <div className={theme ? css.MovieInfoDark : css.MovieInfoLight}>
                        <p className={css.OriginalTitle}>{original_title}</p>
                        <p className={css.Info}><i>Release date: </i>{release_date}</p>

                        {
                            country
                                ? <p className={css.Info}><i>Country: </i>{country}</p>
                                : ''
                        }

                        {
                            isBudget
                                ? <p className={css.Info}><i>Budget:</i> {budget}$</p>
                                : ''
                        }
                        <p className={css.Genre}><i>Genre: </i>{genres.map((genre, index) => <span key={genre.id}
                                                                                                   onClick={() => moviesByGenre(genre.id, genre.name)}>{genre.name}{index !== genres.length - 1 && ','}</span>)}
                        </p>

                        <p className={css.Info}><i>Runtime:</i> {runtime} min</p>
                        <p className={css.Info}><i>About:</i> {overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    MovieInfo
}