import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IGenre} from "../../interfaces";
import css from './Genre.module.css';
import {useAppDispatch} from "../../hooks";
import {genreActions} from "../../redux";

interface IProps {
    genre: IGenre
}

const GenreBadge: FC<IProps> = ({genre}) => {
    const {name, id} = genre;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const moviesByGenre = () => {
        navigate(`${id}`);
        dispatch(genreActions.setSelectedGenre(name));
    }

    return (
        <div className={css.Genre}>
            <span className={css.Text} onClick={() => moviesByGenre()}>{name}</span>
        </div>
    );
};

export {
    GenreBadge
};