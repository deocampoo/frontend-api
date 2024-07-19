import fetchMovieFromTMDB from './tmdbAPI';

const BASE_URL = "http://localhost:9000/api";
const getToken = () => sessionStorage.getItem("access-token");

const insertMovieAPI = async (tmdbId) => {
  const movieData = await fetchMovieFromTMDB(tmdbId);

  const movie = {
    title: movieData.title,
    name: movieData.original_title,
    media_type: 'movie',
    trailerUrl: movieData.homepage,
    overview: movieData.overview,
    poster_path: movieData.poster_path
  };

  let response = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  return await response.json();
};

export default insertMovieAPI;
