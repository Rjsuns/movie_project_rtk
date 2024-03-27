import {useAppSelector} from "../../hooks";

import lightCss from "./Light.module.css";
import darkCss from "./Dark.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {

    const {theme} = useAppSelector(state => state.theme);

    const userClass = theme ? lightCss.User : darkCss.User;

    return (
        <div className={userClass}>
            <FontAwesomeIcon icon={faCircleUser}/>
            <p> Ruslan :( </p>
        </div>
    );
};

export {
    UserInfo
}