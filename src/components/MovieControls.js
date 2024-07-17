import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {insertFavoriteMovie }from "../api/insertFavoriteMovie";
import {insertWatchedMovie} from "../api/insertWatchedMovie";
import {insertToWatchMovie} from "../api/insertToWatchMovie";
import {deleteFavoriteMovie} from "../api/deleteFavoriteMovie";
import {deleteWatchedMovie} from "../api/deleteWatchedMovie";
import {deleteToWatchMovie} from "../api/deleteToWatchMovie";
import {getUserIdFromToken} from "../utils/getUserIdFromToken"; // Importar la función para obtener el ID del usuario

const MovieControls = ({ type, movie }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
    removeMovieFromFavorites,
    addMovieToFavorites,
    addMovieToWatchlist
  } = useContext(GlobalContext);

  const userId = getUserIdFromToken(); // Obtener el ID del usuario desde el token

  const handleAddClick = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    if (type === "watchlist") {
      const response = await insertToWatchMovie(userId, movie.id);
      if (response.message === "Movie added successfully") {
        addMovieToWatchlist(movie);
      }
    } else if (type === "watched") {
      const response = await insertWatchedMovie(userId, movie.id);
      if (response.message === "Movie added successfully") {
        addMovieToWatched(movie);
      }
    } else if (type === "favorites") {
      const response = await insertFavoriteMovie(userId, movie.id);
      if (response.message === "Movie added successfully") {
        addMovieToFavorites(movie);
      }
    }
  };

  const handleRemoveClick = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    if (type === "watchlist") {
      const response = await deleteToWatchMovie(userId, movie.id);
      if (response.message === "Movie removed successfully") {
        removeMovieFromWatchlist(movie.id);
      }
    } else if (type === "watched") {
      const response = await deleteWatchedMovie(userId, movie.id);
      if (response.message === "Movie removed successfully") {
        removeFromWatched(movie.id);
      }
    } else if (type === "favorites") {
      const response = await deleteFavoriteMovie(userId, movie.id);
      if (response.message === "Movie removed successfully") {
        removeMovieFromFavorites(movie.id);
      }
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

export default MovieControls;
