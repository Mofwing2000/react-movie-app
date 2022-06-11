import axiosClient from "./axiosClient";
import apiConfig from "./apiConfig";
import axios from "axios";
export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    latest: 'latest',
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
}

export const tvType = {
    latest: 'latest',
    popular: 'popular',
    top_rated: 'top_rated',
    on_air: 'on_air'
}

export const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    }
]

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getGenreList: (genre, params) => {
        const url = `discover/movie`;
        const genreId = genres.find(val => val.name.toLowerCase() === genre.toLowerCase()).id;
        params['params'].with_genres=genreId.toString();
        console.log(params);
        return axiosClient.get(url, params);
    },
    getVideo: (id, cate) => {
        const url= category[cate] + '/' + id + '/videos';
        console.log(url);
        return axiosClient.get(url, {params: {}});
    },
    search: (params) =>{
        const url = 'search/multi';
        return axiosClient.get(url, params);
    },
    detail: (id, cate) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, {params: {}});
    },
    tvSeason: (id, seasonNumber) => {
        const url = `tv/${id}/season/${seasonNumber}`;
        return axiosClient.get(url, {params:{}});
    },
    tvEpisode: (id, seasonNumber, episodeNumber) => {
        const url = `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;
        return axiosClient.get(url, {params:{}});
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    }
}

export default tmdbApi;
// import axiosClient from "./axiosClient";

// export const category = {
//     movie: 'movie',
//     tv: 'tv'
// }

// export const movieType = {
//     upcoming: 'upcoming',
//     popular: 'popular',
//     top_rated: 'top_rated'
// }

// export const tvType = {
//     popular: 'popular',
//     top_rated: 'top_rated',
//     on_the_air: 'on_the_air'
// }

// const tmdbApi = {
//     getMoviesList: (type, params) => {
//         const url = 'movie/' + movieType[type];
//         return axiosClient.get(url, params);
//     },
//     getTvList: (type, params) => {
//         const url = 'tv/' + tvType[type];
//         return axiosClient.get(url, params);
//     },
//     getVideos: (cate, id) => {
//         const url = category[cate] + '/' + id + '/videos';
//         return axiosClient.get(url, {params: {}});
//     },
//     search: (cate, params) => {
//         const url = 'search/' + category[cate];
//         return axiosClient.get(url, params);
//     },
//     detail: (cate, id, params) => {
//         const url = category[cate] + '/' + id;
//         return axiosClient.get(url, params);
//     },
//     credits: (cate, id) => {
//         const url = category[cate] + '/' + id + '/credits';
//         return axiosClient.get(url, {params: {}});
//     },
//     similar: (cate, id) => {
//         const url = category[cate] + '/' + id + '/similar';
//         return axiosClient.get(url, {params: {}});
//     },
// }

// export default tmdbApi;