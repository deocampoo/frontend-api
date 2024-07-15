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

    const [results, setResults] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [genre, setGenre] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false);

    const itemRef = useRef(null);

    let storedItem = watchlist.find((o) => o.id === selectedItem?.id);
    let storedItemWatched = watched.find((o) => o.id === selectedItem?.id);
    let storedItemFavorites = favorites.find((o) => o.id === selectedItem?.id);

    const watchlistDisabled = storedItem ? true : storedItemWatched ? true : false;
    const watchedDisabled = storedItemWatched ? true : false;
    const favoritesDisabled = storedItemFavorites ? true : false;

    const fetchResults = async (searchKey, genre) => {
        try {
            const params = {
                api_key: apiKey,
                language: "es",
            };

            if (searchKey) {
                params.query = searchKey;
                const movieResponse = await axios.get(`${apiUrl}/search/movie`, { params });
                const seriesResponse = await axios.get(`${apiUrl}/search/tv`, { params });
                const combinedResults = [
                    ...movieResponse.data.results.map(item => ({ ...item, type: 'movie' })),
                    ...seriesResponse.data.results.map(item => ({ ...item, type: 'tv' }))
                ];
                setResults(combinedResults);
                setSearchKey(""); // Clear the search key after fetching results
                if (combinedResults.length) {
                    await fetchItem(combinedResults[0].id, combinedResults[0].type);
                }
            } else if (genre) {
                params.with_genres = genre;
                const movieResponse = await axios.get(`${apiUrl}/discover/movie`, { params });
                const seriesResponse = await axios.get(`${apiUrl}/discover/tv`, { params });
                const combinedResults = [
                    ...movieResponse.data.results.map(item => ({ ...item, type: 'movie' })),
                    ...seriesResponse.data.results.map(item => ({ ...item, type: 'tv' }))
                ];
                setResults(combinedResults);
                if (combinedResults.length) {
                    await fetchItem(combinedResults[0].id, combinedResults[0].type);
                }
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    const fetchItem = async (id, type) => {
        try {
            const { data } = await axios.get(`${apiUrl}/${type}/${id}`, {
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
            setSelectedItem(data);
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        }
    };

    const selectItem = async (item) => {
        await fetchItem(item.id, item.type);
        setSelectedItem(item);
        window.scrollTo(0, 0);
        itemRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const searchItems = (e) => {
        e.preventDefault();
        setSearched(true);
        fetchResults(searchKey, genre);
    };

    useEffect(() => {
        if (!searched) {
            setSelectedItem(null);
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
                    <label htmlFor="searchKey" style={{ color: 'white', marginRight: '10px' }}>Buscar:</label>
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
                    {searched && results.length > 0 && (
                        <div className="col-12">
                            <h3 className="text-white">Resultados</h3>
                            <div className="row">
                                {results.map((item) => (
                                    item.poster_path && (
                                        <div
                                            key={item.id}
                                            className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex flex-column align-items-center"
                                            onClick={() => selectItem(item)}
                                        >
                                            <img
                                                src={`${urlImage + item.poster_path}`}
                                                alt=""
                                                className="movie-poster"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                            <h6 className="text-center mt-2" style={{ color: 'white', maxWidth: '200px' }}>{item.title || item.name}</h6>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    {searched && results.length === 0 && (
                        <div className="col-12">
                            <h3 className="text-center text-white">No se encontraron resultados</h3>
                        </div>
                    )}
                </div>
            </div>

            {searched && selectedItem && (
                <main>
                    <div
                        className="viewtrailer"
                        style={{
                            backgroundImage: `url("${imagePath}${selectedItem.backdrop_path}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        ref={itemRef}
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
                                    <h1 className="text-white">{selectedItem.title || selectedItem.name}</h1>
                                    <p className="text-white">{selectedItem.overview}</p>

                                    <button
                                        className="btn"
                                        disabled={watchlistDisabled}
                                        onClick={() => addMovieToWatchlist(selectedItem)}
                                    >
                                        AGREGAR A POR VER 
                                    </button>

                                    <button
                                        className="btn"
                                        disabled={watchedDisabled}
                                        onClick={() => addMovieToWatched(selectedItem)}
                                    >
                                        AGREGAR A VISTAS
                                    </button>

                                    <button
                                        className="btn"
                                        disabled={favoritesDisabled}
                                        onClick={() => addMovieToFavorites(selectedItem)}
                                    >
                                        AGREGAR A FAVORITAS 
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
