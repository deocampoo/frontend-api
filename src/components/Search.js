import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const Search = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";

    const urlImage = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false); // Estado para indicar si se ha realizado una búsqueda

    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        const {
            data: { results },
        } = await axios.get(`${apiUrl}/${type}/movie`, {
            params: {
                api_key: apiKey,
                query: searchKey,
                language: "es", // Agregar el parámetro language para obtener resultados en español
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
                language: "es", // Agregar el parámetro language para obtener resultados en español
            },
        });

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        setMovie(data);
    };

    const selectMovie = async (movie) => {
        fetchMovie(movie.id);
        setMovie(movie);
        window.scrollTo(0, 0);
    };

    const searchMovies = (e) => {
        e.preventDefault();
        fetchMovies(searchKey);
        setSearched(true); // Marcar que se ha realizado una búsqueda
    };

    useEffect(() => {
        // Si no se ha realizado una búsqueda, limpiar la película seleccionada
        if (!searched) {
            setMovie(null);
        }
    }, [searched]);

    return (
        <div>

            <form className="container mb-4" onSubmit={searchMovies}>
                <input
                    type="text"
                    placeholder="Buscar"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button className="btn btn-primary btn-violet">Buscar</button>
            </form>


            <div>
                <main>

                    {searched && movie ? (
                        <div
                            className="viewtrailer"
                            style={{
                                backgroundImage: `url("${imagePath}${movie.backdrop_path}")`,
                            }}
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
                                        Close
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
                                                Play Trailer
                                            </button>
                                        ) : (
                                            "Sorry, no trailer available"
                                        )}
                                        <h1 className="text-white">{movie.title}</h1>
                                        <p className="text-white">{movie.overview}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : searched && !movie ? (
                        <div className="container">
                            <h1 className="text-center" style={{ color: "white" }}>No se encontraron resultados</h1>
                        </div>
                    ) : null}
                </main>
            </div>

            <div className="container mt-3">
                <div className="row">
                    {searched && movies.map((movie) => (
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
                            <h4 className="text-center" id='movieTittle'>{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
