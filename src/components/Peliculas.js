import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const Peliculas = () => {

    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";

    // endpoint para las imágenes
    const urlImage = "https://image.tmdb.org/t/p/original";

    // variables de estado
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState({})
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({ title: "Cargando películas" });
    const [playing, setPlaying] = useState(false);

    // función para realizar la petición get a la API
    const fetchMovies = async () => {
        const {
            data: { results },
        } = await axios.get(`${apiUrl}/discover/movie`, {
            params: {
                api_key: apiKey,
                language: 'es', // Cambio de idioma a español
                with_genres: '28', // ID del género de películas
            },
        });

        setMovies(results);
        setMovie(results[0]);

        if (results.length) {
            await fetchMovie(results[0].id);
        }
    };

    // función para la petición de un solo objeto y mostrar en reproductor de videos
    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${apiUrl}/movie/${id}`, {
            params: {
                api_key: apiKey,
                append_to_response: "videos",
                language: 'es', // Cambio de idioma a español
            },
        });

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        // return data
        setMovie(data);
    };

    const selectMovie = async (movie) => {
        fetchMovie(movie.id);

        setMovie(movie);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h2 className="text-center mt-5 mb-5" id="tittle">Películas</h2>

            <div>
                <main>
                    {movie ? (
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
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : null}
                </main>
            </div>

            {/* contenedor para mostrar los posters y las películas en la petición a la API */}
            <div className="container mt-3">
                <div className="row">
                    {movies.map((movie) => (
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

export default Peliculas;
