import {IGenre} from "./genreInterface";

export interface IMovie {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    overview: string,
    vote_average: number,
    budget: number,
    genres: IGenre[],
    runtime: number,
    production_countries: [{ name: string }] | []
}