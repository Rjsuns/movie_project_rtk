import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {posterActions} from "../../redux";
import without_image from './images/without_image.jpg'


interface IProps {
    original_title: string,
    poster_path: string,
    size: string
}

const PosterPreview: FC<IProps> = ({poster_path, original_title, size}) => {

    const dispatch = useAppDispatch();

    const {secure_base_url} = useAppSelector(state => state.poster);

    useEffect(() => {
        dispatch(posterActions.getBaseUrl())
    }, [dispatch]);

    const imageUrl = `${secure_base_url}${'w' + size}${poster_path}`;

    const isPoster = (poster_path: string) => {
        if (poster_path) {
            return <img src={imageUrl} alt={original_title}/>
        } else {
            return <img src={without_image} alt={'not available'} style={{width: 200, height: 300}}/>
        }
    }

    return isPoster(poster_path);
};

export {
    PosterPreview
}