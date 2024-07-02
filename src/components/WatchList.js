import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";
import ScrollFooter from './ScrollFooter';

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);

  return (
    <ScrollFooter>
      <div className="movie-page">
        <div className="container">
          <div className="header">
            <h1 className="heading">Mi lista por ver</h1>

            <span className="count-pill">
              {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
            </span>
          </div>

          {watchlist.length > 0 ? (
            <div className="movie-grid">
              {watchlist.map((movie) => (
                <MovieCard movie={movie} key={movie.id} type="watchlist" />
              ))}
            </div>
          ) : (
            <h2 className="no-movies">No hay películas en tu lista Por ver</h2>
          )}
        </div>
      </div>
    </ScrollFooter>
  );
};

export default Watchlist;
