export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter((movie) => movie.id !== action.payload.id),
        watched: [action.payload, ...state.watched],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter((movie) => movie.id !== action.payload),
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    case "ADD_MOVIE_TO_FAVORITES":
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    case "REMOVE_MOVIE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((movie) => movie.id !== action.payload),
      };
    case "CLEAR_MOVIE_LISTS":
      return {
        ...state,
        watchlist: [],
        watched: [],
        favorites: []
      };
    default:
      return state;
  }
};
