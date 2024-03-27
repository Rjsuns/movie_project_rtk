import {IResGenre} from "../interfaces";
import {IRes} from "../types";
import {apiService} from "./apiService";
import {urls} from "../constants";

const genreService = {
    getAll: (): IRes<IResGenre> => apiService.get(urls.genres)
}

export {
    genreService
}