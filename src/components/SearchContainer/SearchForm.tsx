import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {ISearch} from "../../interfaces";
import {movieActions} from "../../redux";
import {MoviesList, MoviesListCard} from "../MoviesContainer";
import {LoadingSpinner} from "../LoadingContainer";
import {Pagination} from "../PaginationContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import formCss from './SearchForm.module.css';
import css from '../MoviesContainer/Movies.module.css'


const SearchForm = () => {
    const dispatch = useAppDispatch();
    const {movies, totalPages, total_results, isLoading} = useAppSelector(state => state.movie);

    const {register, reset, handleSubmit} = useForm<ISearch>();

    const [initialMovieList, setInitialMovieList] = useState<boolean>(true);

    const [value, setValue] = useState<ISearch>(null);

    const [query, setQuery] = useSearchParams({page: "1", value: ''})
    const page = query.get('page');
    const searchValue = query.get('value');

    const submit: SubmitHandler<ISearch> = (value) => {
        setValue(value);
        setQuery(prev => {
            prev.set('page', `${1}`);
            prev.set('value', `${value.search}`);
            return prev;
        })
        setInitialMovieList(false);
        reset();
    }

    useEffect(() => {
        if (value || searchValue) {
            dispatch(movieActions.searchMovie({page, query: searchValue}));
        }
    }, [page, value, searchValue, dispatch]);

    return (
        <div className={formCss.Container}>

            {isLoading && <LoadingSpinner/>}

            <form onSubmit={handleSubmit(submit)} className={formCss.Form}>
                <input type="search"
                       placeholder={'Search'}
                       required={true}
                       {...register('search')}
                       className={formCss.Input}/>

                <button type={"submit"} className={formCss.Button}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </form>

            <div>
                {initialMovieList
                    ? <MoviesList/>
                    :
                    total_results === 0
                        ? (
                            <p className={formCss.ErrorText}><span>No matching items found :( <br/> Try changing search
                                criteria...</span></p>)
                        :
                        <div className={css.Movies}>{(movies.map(movie => <MoviesListCard movie={movie}
                                                                                          key={movie.id}/>))}</div>
                }
            </div>


            <div>
                {initialMovieList || total_results === 0
                    ? ''
                    : <Pagination setQuery={setQuery} page={page} totalPages={totalPages}/>
                }
            </div>

        </div>
    );
};

export {SearchForm};