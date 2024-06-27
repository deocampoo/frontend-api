// GlobalState.js
import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state]);

  // Actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const addMovieToFavorites = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  const removeMovieFromFavorites = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITES", payload: id });
  };

  const moveToWatchlist = (movie) => {
    // Remove from watched list
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: movie.id });
    // Add to watchlist
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
