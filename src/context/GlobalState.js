import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import insertMovieAPI from '../API/insertMovieAPI';
import deleteMovieAPI from '../API/deleteMovieAPI';
import insertFavoriteMovie from "../API/insertFavoriteMovieAPI";
import insertToWatchMovie from "../API/insertToWatchMovieAPI";
import insertWatchedMovie from "../API/insertWatchedMovieAPI";
import deleteFavoriteMovie from "../API/deleteFavoriteMovieAPI";
import deleteToWatchMovie from "../API/deleteToWatchMovieAPI";
import deleteWatchedMovie from "../API/deleteWatchedMovieAPI";
import {jwtDecode} from "jwt-decode";

// Initial state
const initialState = {
  watchlist: JSON.parse(sessionStorage.getItem("watchlist")) || [],
  watched: JSON.parse(sessionStorage.getItem("watched")) || [],
  favorites: JSON.parse(sessionStorage.getItem("favorites")) || [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Get userId from token
const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.userId; // Asegúrate de que tu token tenga el campo userId
};

// Provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const userId = getUserIdFromToken();

  useEffect(() => {
    sessionStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    sessionStorage.setItem("watched", JSON.stringify(state.watched));
    sessionStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state]);

  // Actions
  const addMovieToWatchlist = async (movie) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      const newMovie = await insertToWatchMovie(userId, movie);
      dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: newMovie });
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };

  const addMovieToWatched = async (movie) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      const newMovie = await insertWatchedMovie(userId, movie);
      dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: newMovie });
    } catch (error) {
      console.error("Error adding movie to watched:", error);
    }
  };

  const addMovieToFavorites = async (movie) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      const newMovie = await insertFavoriteMovie(userId, movie);
      dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: newMovie });
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  const removeMovieFromWatchlist = async (movieId) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      await deleteToWatchMovie(userId, movieId);
      dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: movieId });
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  const removeFromWatched = async (movieId) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      await deleteWatchedMovie(userId, movieId);
      dispatch({ type: "REMOVE_FROM_WATCHED", payload: movieId });
    } catch (error) {
      console.error("Error removing movie from watched:", error);
    }
  };

  const removeMovieFromFavorites = async (movieId) => {
    if (!userId) {
      console.error("User ID not available");
      return;
    }
    try {
      await deleteFavoriteMovie(userId, movieId);
      dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITES", payload: movieId });
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: movie.id });
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const fetchAndAddMovie = async (tmdbId) => {
    const movie = await insertMovieAPI(tmdbId); // Fetch and insert movie from TMDB
    addMovieToWatchlist(movie); // Add movie to local state
    addMovieToWatched(movie);
    addMovieToFavorites(movie);
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        favorites: state.favorites,
        addMovieToWatchlist,
        addMovieToWatched,
        addMovieToFavorites,
        removeMovieFromWatchlist,
        removeFromWatched,
        removeMovieFromFavorites,
        moveToWatchlist,
        fetchAndAddMovie,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
