import axios from "axios";
import { apiKey } from '../constant';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day`
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated`
const searchMoviesEndpoint =  `${apiBaseUrl}/search/movie`

//dynamic endpoints
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}`
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits`
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar`

//dynamic personDetails endpoint
const personDeatilsEndpoint = id=> `${apiBaseUrl}/person/${id}`
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}`:undefined
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}`:undefined
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}`:undefined

// fallback Images
export const fallbackMovieImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNYEXAvgnkWiwbg5-e8L0bVErRWGKUwwtJqQ&s"
export const fallbackPersonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&s"


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
}
export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}
export const fetchPersonDetails = (id) => {
    return apiCall(personDeatilsEndpoint(id));
}
export const fetchPersonMovies = (id) => {
    return apiCall(personMoviesEndpoint(id));
}
export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint,params);
}