import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MovieControls } from './MovieControls';
import {listAllMovies} from '../API/listAllWatchedMovieAPI';
import {getUserIdFromToken} from "../utils/getUserIdFromToken"; // Importar la función para obtener el ID del usuario



const Watched = () => {
  const { watched, addMovieToWatched } = useContext(GlobalContext);
  const userId = getUserIdFromToken();
  useEffect(() => {
    const fetchWatchedMovies = async () => {
      const response = await listAllMovies(userId, "watched");
      if (response.watchedMovies) {
        response.watchedMovies.forEach(movie => addMovieToWatched(movie));
      }
    };

    fetchWatchedMovies();
  }, [userId, addMovieToWatched]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Películas vistas</h1>
        </div>

        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map((movie) => (
              <div className="movie-card" key={movie.id}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    className="movie-poster"
                  />
                ) : (
                  <div className="filler-poster"></div>
                )}
                <MovieControls type="watched" movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No hay películas en tu lista de vistas</h2>
        )}
      </div>
    </div>
  );
};

export default Watched;
