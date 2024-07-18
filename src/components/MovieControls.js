import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import PropTypes from "prop-types";

const MovieControls = ({ type, movie }) => {
  const {
    addMovieToFavorites,
    removeMovieFromFavorites,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    addMovieToWatched,
    removeMovieFromWatched
  } = useContext(GlobalContext);

  const handleAddClick = () => {
    if (type === "favorites") {
      addMovieToFavorites(movie);
    } else if (type === "watchlist") {
      addMovieToWatchlist(movie);
    } else if (type === "watched") {
      addMovieToWatched(movie);
    }
  };

  const handleRemoveClick = () => {
    if (type === "favorites") {
      removeMovieFromFavorites(movie.id);
    } else if (type === "watchlist") {
      removeMovieFromWatchlist(movie.id);
    } else if (type === "watched") {
      removeMovieFromWatched(movie.id);
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

MovieControls.propTypes = {
  type: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export { MovieControls };
