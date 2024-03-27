import axios from "axios";

import {baseURL} from "../constants";

const apiService = axios.create({baseURL})

apiService.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTI4NTdlYjBjOGE0MWI5OWZlOTNmMDU3NGZhMzlkNiIsInN1YiI6IjY1ZGRkZDFiM2ZmMmRmMDE2NDBhYTc1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ap1Wdg6xraL8z0LQsjcjHGRLjmHYtG5Sr8AY_xyI6CQ`;

    return request
})

export {
    apiService
}