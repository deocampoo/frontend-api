import React, { useContext } from "react";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";


export const ResultCard = ({ movie }) => { // Corregir para que reciba 'movie'
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(GlobalContext);


  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);


  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;


  const watchedDisabled = storedMovieWatched ? true : false;


  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>


      <div className="info">
        <div className="header">
            <h1 className="text-white">{movie.title}</h1>
        </div>


        <div className="controls">
         
        </div>
      </div>
    </div>
  );
};


export default ResultCard;
