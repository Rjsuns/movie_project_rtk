import {NavLink} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {ThemeSwitcher} from "./ThemeSwitcher";
import {UserInfo} from "./UserInfo";
import lightCss from "./Light.module.css";
import darkCss from "./Dark.module.css";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = () => {

    const {theme} = useAppSelector(state => state.theme);

    const headerClass = theme ? lightCss.Header : darkCss.Header;
    const titleClass = theme ? lightCss.Title : darkCss.Title;
    const navLinkClass = theme ? lightCss.Navlink : darkCss.Navlink;

    return (
        <div className={headerClass}>

            <div className={titleClass}>
                <FontAwesomeIcon icon={faVideo}/>
                <span>MovieDB</span>
            </div>

            <div className={navLinkClass}>
                <NavLink to={'/movies'}>Movies</NavLink>
                <NavLink to={'/genres'}>Genres</NavLink>
                <NavLink to={'/search'}>Search</NavLink>
            </div>

            <ThemeSwitcher/>
            <UserInfo/>
        </div>
    );
};

export {
    Header
}