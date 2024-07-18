import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MovieControls } from './MovieControls';

const Favorites = () => {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Favoritas</h1>
        </div>

        {favorites.length > 0 ? (
          <div className="movie-grid">
            {favorites.map((movie) => (
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
                <MovieControls type="favorites" movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No hay películas o series en tu lista de favoritas</h2>
        )}
      </div>
    </div>
  );
};

export default Favorites;
