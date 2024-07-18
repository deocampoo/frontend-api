import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";

const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.userId;
};

const MovieControls = ({ type, movie }) => {
  const {
    addMovieToFavorites,
    removeMovieFromFavorites,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    addMovieToWatched,
    removeMovieFromWatched
  } = useContext(GlobalContext);

  const userId = getUserIdFromToken();

  const handleAddClick = async () => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      if (type === "favorites") {
        await addMovieToFavorites(movie);
      } else if (type === "watchlist") {
        await addMovieToWatchlist(movie);
      } else if (type === "watched") {
        await addMovieToWatched(movie);
      }
    } catch (error) {
      console.error(`Error adding movie to ${type}:`, error);
    }
  };

  const handleRemoveClick = async () => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      if (type === "favorites") {
        await removeMovieFromFavorites(movie.id);
      } else if (type === "watchlist") {
        await removeMovieFromWatchlist(movie.id);
      } else if (type === "watched") {
        await removeMovieFromWatched(movie.id);
      }
    } catch (error) {
      console.error(`Error removing movie from ${type}:`, error);
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
