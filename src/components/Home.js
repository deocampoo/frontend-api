import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { GlobalContext } from "../context/GlobalState";

const Home = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
  const imagePath = "https://image.tmdb.org/t/p/original";
  const urlImage = "https://image.tmdb.org/t/p/original";

  const { addMovieToWatchlist, addMovieToWatched, addMovieToFavorites, watchlist, watched, favorites } = useContext(GlobalContext);

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Cargando películas" });
  const [playing, setPlaying] = useState(false);

  const movieRef = useRef(null);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);
  let storedMovieFavorites = favorites.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true : false;
  const watchedDisabled = storedMovieWatched ? true : false;
  const favoritesDisabled = storedMovieFavorites ? true : false;

  const fetchMovies = async () => {
    const { data: { results } } = await axios.get(`${apiUrl}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: 'es',
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${apiUrl}/movie/${id}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
        language: 'es',
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((vid) => vid.name === "Official Trailer");
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = async (movieItem) => {
    await fetchMovie(movieItem.id);
    setMovie(movieItem);
    movieRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
      <div>
        <h2 className="text-center mt-5 mb-5" id="tittle">Movie HUB</h2>

        <div>
          <main>
            {movie ? (
              <div
                className="viewtrailer"
                style={{
                  backgroundImage: `url("${imagePath}${movie.backdrop_path}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                ref={movieRef}
              >
                {playing ? (
                  <>
                    <YouTube
                      videoId={trailer.key}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="boton">
                      Cerrar
                    </button>
                  </>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <button
                          className="boton"
                          onClick={() => setPlaying(true)}
                          type="button"
                        >
                          Reproducir Tráiler
                        </button>
                      ) : (
                        "Lo siento, tráiler no disponible"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>

                      <button
                        className="btn"
                        disabled={watchlistDisabled}
                        onClick={() => addMovieToWatchlist(movie)}
                      >
                        Agregar a Películas Por ver
                      </button>

                      <button
                        className="btn"
                        disabled={watchedDisabled}
                        onClick={() => addMovieToWatched(movie)}
                      >
                        Agregar a Películas Vistas
                      </button>

                      <button
                        className="btn"
                        disabled={favoritesDisabled}
                        onClick={() => addMovieToFavorites(movie)}
                      >
                        Agregar a Favoritas
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </main>
        </div>

        <div className="container mt-3">
          <div className="row">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="col-md-4 mb-3 d-flex flex-column align-items-center"
                onClick={() => selectMovie(movie)}
              >
                <img
                  src={`${urlImage + movie.poster_path}`}
                  alt=""
                  height={450}  // Ajuste de altura
                  width={300}   // Ajuste de ancho
                  style={{ objectFit: 'cover' }}
                />
                <h6 className="text-center mt-2" id='movieTittle' style={{ width: '200px' }}>{movie.title}</h6>  
              </div>
            ))}
          </div>
        </div>

      </div>
  );
};

export default Home;
