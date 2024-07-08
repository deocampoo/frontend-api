import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { GlobalContext } from '../context/GlobalState';

const Search = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";
    const urlImage = "https://image.tmdb.org/t/p/original";

    const { addMovieToWatchlist, addMovieToWatched, addMovieToFavorites, watchlist, watched, favorites } = useContext(GlobalContext);

    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [genre, setGenre] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false);

    const movieRef = useRef(null);

    let storedMovie = watchlist.find((o) => o.id === movie?.id);
    let storedMovieWatched = watched.find((o) => o.id === movie?.id);
    let storedMovieFavorites = favorites.find((o) => o.id === movie?.id);

    const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true : false;
    const watchedDisabled = storedMovieWatched ? true : false;
    const favoritesDisabled = storedMovieFavorites ? true : false;

    const fetchMovies = async (searchKey, genre) => {
        try {
            const params = {
                api_key: apiKey,
                language: "es",
            };

            if (searchKey) {
                params.query = searchKey;
                const { data: { results } } = await axios.get(`${apiUrl}/search/movie`, { params });
                setMovies(results);
                setSearchKey(""); // Clear the search key after fetching results
                if (results.length) {
                    await fetchMovie(results[0].id);
                }
            } else if (genre) {
                params.with_genres = genre;
                const { data: { results } } = await axios.get(`${apiUrl}/discover/movie`, { params });
                setMovies(results);
                if (results.length) {
                    await fetchMovie(results[0].id);
                }
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const fetchMovie = async (id) => {
        try {
            const { data } = await axios.get(`${apiUrl}/movie/${id}`, {
                params: {
                    api_key: apiKey,
                    append_to_response: "videos",
                    language: "es",
                },
            });

            if (data.videos && data.videos.results) {
                const trailer = data.videos.results.find(
                    (vid) => vid.name === "Official Trailer"
                );
                setTrailer(trailer ? trailer : data.videos.results[0]);
            }
            setMovie(data);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    const selectMovie = async (movieItem) => {
        await fetchMovie(movieItem.id);
        setMovie(movieItem);
        window.scrollTo(0, 0);
        movieRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const searchItems = (e) => {
        e.preventDefault();
        setSearched(true);
        fetchMovies(searchKey, genre);
    };

    useEffect(() => {
        if (!searched) {
            setMovie(null);
        }
    }, [searched]);

    const genreOptions = [
        { value: "", label: "Todos los géneros" },
        { value: "28", label: "Acción" },
        { value: "12", label: "Aventura" },
        { value: "35", label: "Comedia" },
        { value: "99", label: "Documentales" },
        { value: "18", label: "Drama" },
        { value: "27", label: "Terror" },
        { value: "10749", label: "Románticas" },
    ];

    const inputStyle = {
        padding: '8px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        marginRight: '10px',
        width: 'calc(100% - 150px)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const selectStyle = {
        padding: '8px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        marginRight: '10px',
        width: 'calc(100% - 150px)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div>
            <form className="container mb-4" onSubmit={searchItems} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <label htmlFor="searchKey" style={{ color: 'white', marginRight: '10px' }}>Buscar película:</label>
                    <input
                        id="searchKey"
                        type="text"
                        placeholder="Buscar"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <label htmlFor="genre" style={{ color: 'white', marginRight: '10px' }}>Género:</label>
                    <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        style={selectStyle}
                    >
                        {genreOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary btn-violet" style={{ padding: '10px 20px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>Buscar</button>
            </form>

            <div className="container mt-3">
                <div className="row">
                    {searched && movies.length > 0 && (
                        <div className="col-12">
                            <h3 className="text-white">Películas</h3>
                            <div className="row">
                                {movies.map((movie) => (
                                    movie.poster_path && (
                                        <div
                                            key={movie.id}
                                            className="col-md-4 mb-3"
                                            onClick={() => selectMovie(movie)}
                                        >
                                            <img
                                                src={`${urlImage + movie.poster_path}`}
                                                alt=""
                                                height={600}
                                                width="100%"
                                            />
                                            <h4 className="text-center text-white">{movie.title}</h4>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {searched && movies.length === 0 && (
                        <div className="col-12">
                            <h3 className="text-center text-white">No se encontraron resultados</h3>
                        </div>
                    )}
                </div>
            </div>

            {searched && movie && (
                <main>
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
                                            Ver Trailer
                                        </button>
                                    ) : (
                                        <h4 style={{ color: 'white' }}>Lo siento, tráiler no disponible</h4>
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
                </main>
            )}
        </div>
    );
}

export default Search;
