import {FC} from "react";

import css from './Error.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    error: string
}

const AxiosError: FC<IProps> = ({error}) => {
    return (
        <div className={css.Error}>
            <FontAwesomeIcon icon={faCircleExclamation}/> {error}
        </div>
    );
};

export {
    AxiosError
};