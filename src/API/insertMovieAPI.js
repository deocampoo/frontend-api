import fetchMovieFromTMDB from './tmdbAPI';

const BASE_URL = "http://localhost:9000/api";
const getToken = () => sessionStorage.getItem("token");

const insertMovieAPI = async (tmdbId) => {
  // Fetch movie details from TMDB
  const movieData = await fetchMovieFromTMDB(tmdbId);

  // Map TMDB data to your movie model
  const movie = {
    title_movie: movieData.title || movieData.name,
    title_tv: movieData.name,
    media_type: movieData.media_type || 'movie', // Assuming media_type is available
    genre: movieData.genres.map(genre => genre.name).join(', '), // Convert genres array to a comma-separated string
    director: movieData.director || 'Unknown', // Assuming a director field or provide a default value
    language: movieData.original_language || 'en'
  };

  // Insert movie into your database
  const response = await fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error inserting movie');
  }

  return await response.json();
};

export default insertMovieAPI;
