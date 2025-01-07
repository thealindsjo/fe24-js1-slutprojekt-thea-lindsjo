/**
 * Contains functions to interact with The Movie Database (TMDb) API, https://www.themoviedb.org/documentation/api.
 * 
 * Fetches data for top-rated movies, popular movies, search results, and popular 
 * TV shows.
 */
const API_KEY = 'f295e0fcea5660b6b27014610e71f778';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTopRatedMovies() {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return await response.json();
}

export async function fetchPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return await response.json();
}

export async function search(query) {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`);
    const data = await response.json();
    console.log('Search results:', data);
    return data;
}

export async function fetchPopularTVShows() {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return await response.json();
}
