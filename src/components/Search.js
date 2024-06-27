import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const Search = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84"; // Asegúrate de usar tu clave API aquí
    const imagePath = "https://image.tmdb.org/t/p/original";
    const urlImage = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const [people, setPeople] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState(null);
    const [person, setPerson] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false);

    const fetchMovies = async (searchKey) => {
        try {
            const { data: { results } } = await axios.get(`${apiUrl}/search/movie`, {
                params: {
                    api_key: apiKey,
                    query: searchKey,
                    language: "es",
                },
            });

            setMovies(results);
            if (results.length) {
                await fetchMovie(results[0].id);
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

    const fetchPeople = async (searchKey) => {
        try {
            const { data: { results } } = await axios.get(`${apiUrl}/search/person`, {
                params: {
                    api_key: apiKey,
                    query: searchKey,
                    language: "es",
                },
            });

            setPeople(results);
        } catch (error) {
            console.error("Error fetching people:", error);
        }
    };

    const selectMovie = async (movie) => {
        fetchMovie(movie.id);
        setMovie(movie);
        setPerson(null);
        window.scrollTo(0, 0);
    };

    const selectPerson = async (person) => {
        setPerson(person);
        setMovies([]);
        setMovie(null);
    };

    const searchItems = (e) => {
        e.preventDefault();
        setSearched(true);
        fetchMovies(searchKey);
        fetchPeople(searchKey);
    };

    useEffect(() => {
        if (!searched) {
            setMovie(null);
            setPerson(null);
        }
    }, [searched]);

    return (
        <div>
            <form className="container mb-4" onSubmit={searchItems}>
                <input
                    type="text"
                    placeholder="Buscar"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button className="btn btn-primary btn-violet">Buscar</button>
            </form>

            <div className="container mt-3">
                <div className="row">
                    {/* Mostrar resultados de actores/directores */}
                    {searched && people.length > 0 && (
                        <div className="col-12 mb-4">
                            <h3 className="text-white">Actores/Directores</h3>
                            <div className="row">
                                {people.map((person) => (
                                    <div
                                        key={person.id}
                                        className="col-md-4 mb-3"
                                        onClick={() => selectPerson(person)}
                                    >
                                        <img
                                            src={person.profile_path ? `${urlImage + person.profile_path}` : 'https://via.placeholder.com/600x900'}
                                            alt=""
                                            height={600}
                                            width="100%"
                                        />
                                        <h4 className="text-center text-white">{person.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mostrar resultados de películas */}
                    {searched && movies.length > 0 && (
                        <div className="col-12">
                            <h3 className="text-white">Películas</h3>
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
                                        <h4 className="text-center text-white">{movie.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mostrar mensaje si no hay resultados */}
                    {searched && people.length === 0 && movies.length === 0 && (
                        <div className="col-12">
                            <h3 className="text-center text-white">No se encontraron resultados</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Mostrar detalle de película o actor seleccionado */}
            {searched && (movie || person) && (
                <main>
                    {movie && (
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
                    )}
                    {person && (
                        <div className="container">
                            <h1 className="text-center text-white">{person.name}</h1>
                            <p className="text-center text-white">Known for: {person.known_for_department}</p>
                            <div className="row">
                                {person.known_for.map((movie) => (
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
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
}

export default Search;
