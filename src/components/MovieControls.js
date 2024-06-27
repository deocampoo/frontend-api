// MovieControls.js
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const MovieControls = ({ type, movie }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
    addMovieToFavorites,
    removeMovieFromFavorites,
  } = useContext(GlobalContext);

  const handleAddClick = () => {
    if (type === "watchlist") {
      addMovieToWatched(movie);
    } else if (type === "watched") {
      moveToWatchlist(movie); // Utiliza moveToWatchlist aquí
    }
  };

  const handleRemoveClick = () => {
    if (type === "watchlist") {
      removeMovieFromWatchlist(movie.id);
    } else if (type === "watched") {
      removeFromWatched(movie.id);
    } else if (type === "favorites") {
      removeMovieFromFavorites(movie.id);
    }
  };

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button className="ctrl-btn" onClick={handleAddClick}>
            <i className="fa-fw far fa-eye">Mover a Películas vistas</i>
          </button>

          <button className="ctrl-btn" onClick={handleRemoveClick}>
            <i className="fa-fw fa fa-times">Remover de Mi lista por ver</i>
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button className="ctrl-btn" onClick={handleAddClick}>
            <i className="fa-fw far fa-eye-slash">Mover a Por Ver</i>
          </button>

          <button className="ctrl-btn" onClick={handleRemoveClick}>
            <i className="fa-fw fa fa-times">Remover de Películas vistas</i>
          </button>
        </>
      )}

      {type === "favorites" && (
        <>
          <button className="ctrl-btn" onClick={handleRemoveClick}>
            <i className="fa-fw fa fa-heart">Remover de Favoritas</i>
          </button>
        </>
      )}
    </div>
  );
};

export { MovieControls };
