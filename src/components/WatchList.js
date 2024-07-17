import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MovieControls } from './MovieControls';
import {listAllMovies} from '../API/listAllToWatchMovieAPI';
import {getUserIdFromToken} from "../utils/getUserIdFromToken"; // Importar la función para obtener el ID del usuario


const ToWatch = () => {
  const { watchlist, addMovieToWatchlist } = useContext(GlobalContext);
  const userId = getUserIdFromToken();


  useEffect(() => {
    const fetchToWatchMovies = async () => {
      const response = await listAllMovies(userId, "toWatch");
      if (response.toWatchMovies) {
        response.toWatchMovies.forEach(movie => addMovieToWatchlist(movie));
      }
    };

    fetchToWatchMovies();
  }, [userId, addMovieToWatchlist]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Películas por ver</h1>
        </div>

        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((movie) => (
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
                <MovieControls type="watchlist" movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No hay películas en tu lista por ver</h2>
        )}
      </div>
    </div>
  );
};

export default ToWatch;
