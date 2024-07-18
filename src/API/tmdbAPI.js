const TMDB_API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieFromTMDB = async (movieId) => {
  let response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
  let data = await response.json();
  return data;
};

export default fetchMovieFromTMDB;
