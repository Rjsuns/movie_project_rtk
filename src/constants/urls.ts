const baseURL = 'https://api.themoviedb.org/3';

const movies = '/discover/movie';
const movie = '/movie';

const genres = '/genre/movie/list';
const search = '/search/movie';
const configuration = '/configuration';

const urls = {
    movies: {
        base: movies,
        byId: (id: number | string): string => `${movie}/${id}`
    },
    genres,
    search,
    configuration
}

export {
    baseURL,
    urls
}