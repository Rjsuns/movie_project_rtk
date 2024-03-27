import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";

import {IMovie, IResMovie} from "../../interfaces";
import {moviesService, searchService} from "../../services";

interface IState {
    movies: IMovie[],
    movie: IMovie,
    totalPages: number,
    total_results: number,
    isLoading: boolean,
    error: string,
}

const initialState: IState = {
    movies: [],
    movie: null,
    totalPages: 1,
    total_results: null,
    isLoading: null,
    error: null,
}

const getAll = createAsyncThunk<IResMovie, { page: string, genreId?: string }>(
    'movieSlice/getAll',
    async ({page, genreId}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getAll(page, genreId);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data);
        }
    }
)

const getById = createAsyncThunk<IMovie, { id: number | string }>(
    'movieSlice/GetById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await moviesService.getById(id);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const searchMovie = createAsyncThunk<IResMovie, { page: string | number, query: string }>(
    'movieSlice/searchMovie',
    async ({page, query}, {rejectWithValue}) => {
        try {
            const {data} = await searchService.getAll(query, page);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setMovie: state => {
            state.movie = null;
        },
        setMovies: state => {
            state.movies = [];
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.movie = action.payload;
            })
            .addMatcher(isFulfilled(getAll, searchMovie), (state, action) => {
                const {results, total_results, total_pages} = action.payload;
                state.movies = results;
                state.total_results = total_results;
                state.totalPages = total_pages <= 500 ? total_pages : 500;
            })
            .addMatcher(isPending(getAll, getById, searchMovie), (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addMatcher(isFulfilled(getAll, getById, searchMovie), (state) => {
                state.isLoading = false;
                state.error = null;
            })

});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {...actions, getAll, getById, searchMovie}


export {
    movieActions,
    movieSlice,
    movieReducer
}