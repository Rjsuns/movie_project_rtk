import {Outlet} from "react-router-dom";

import {Header} from "../components/HeaderContainer/Header";
import {useAppSelector} from "../hooks";
import light from './Light.module.css';
import dark from './Dark.module.css';
import {AxiosError} from "../components";

const MainLayout = () => {
    const {theme} = useAppSelector(state => state.theme);

    const {error: genreError} = useAppSelector(state => state.genre);
    const {error: movieError} = useAppSelector(state => state.movie);
    const {error: posterError} = useAppSelector(state => state.poster);

    return (
        <div className={theme ? light.Background : dark.Background}>

            <Header/>

            <div className={dark.MainContainer}>
                {((genreError || movieError || posterError)
                    ? <AxiosError error={genreError || movieError || posterError}/>
                    : <Outlet/>)}
            </div>
        </div>
    );
};

export {MainLayout};