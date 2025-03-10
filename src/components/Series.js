import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { GlobalContext } from '../context/GlobalState';

const Series = () => {
  const apiUrl = "https://api.themoviedb.org/3";
  const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
  const imagePath = "https://image.tmdb.org/t/p/original";
  const urlImage = "https://image.tmdb.org/t/p/original";

  const { addMovieToWatchlist, addMovieToWatched, addMovieToFavorites, watchlist, watched, favorites } = useContext(GlobalContext);

  const [series, setSeries] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [serie, setSerie] = useState({ name: "Cargando series" });
  const [playing, setPlaying] = useState(false);

  const serieRef = useRef(null);

  const fetchSeries = async () => {
    const { data: { results } } = await axios.get(`${apiUrl}/discover/tv`, {
      params: {
        api_key: apiKey,
        language: 'es',
        sort_by: 'popularity.desc',
      },
    });

    setSeries(results);
    setSerie(results[0]);

    if (results.length) {
      await fetchSerie(results[0].id);
    }
  };

  const fetchSerie = async (id) => {
    const { data } = await axios.get(`${apiUrl}/tv/${id}`, {
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

    setSerie(data);
  };

  const selectSerie = async (serieItem) => {
    await fetchSerie(serieItem.id);
    setSerie(serieItem);
    serieRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  let storedSerie = watchlist.find((o) => o.id === serie.id);
  let storedSerieWatched = watched.find((o) => o.id === serie.id);
  let storedSerieFavorites = favorites.find((o) => o.id === serie.id);

  const watchlistDisabled = storedSerie ? true : storedSerieWatched ? true : false;
  const watchedDisabled = storedSerieWatched ? true : false;
  const favoritesDisabled = storedSerieFavorites ? true : false;

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="home-container">
      <h2 className="text-center mt-5 mb-5" id="title" style={{ color: 'white' }}>Series</h2>

      <div>
        <main>
          {serie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${imagePath}${serie.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              ref={serieRef}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container reproductor-mobile"
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
                      <h4 style={{ color: 'white' }}>Lo siento, tráiler no disponible</h4>
                    )}
                    <h1 style={{ color: 'white' }}>{serie.name}</h1>
                    <p style={{ color: 'white' }}>{serie.overview}</p>

                    <button
                      className="btn"
                      disabled={watchlistDisabled}
                      onClick={() => addMovieToWatchlist(serie)}
                    >
                      Agregar a Series Por ver
                    </button>

                    <button
                      className="btn"
                      disabled={watchedDisabled}
                      onClick={() => addMovieToWatched(serie)}
                    >
                      Agregar a Series Vistas
                    </button>

                    <button
                      className="btn"
                      disabled={favoritesDisabled}
                      onClick={() => addMovieToFavorites(serie)}
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
          {series.map((serie) => (
            <div
              key={serie.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex flex-column align-items-center"
              onClick={() => selectSerie(serie)}
            >
              <img
                src={`${urlImage + serie.poster_path}`}
                alt=""
                className="movie-poster"
              />
              <h6 className="text-center mt-2" style={{ color: 'white' }}>{serie.name}</h6>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Series;


