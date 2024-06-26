import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const Search = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84"; // Asegúrate de usar tu clave API aquí
    const imagePath = "https://image.tmdb.org/t/p/original";
    const urlImage = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const [people, setPeople] = useState([]); // Estado para los resultados de búsqueda de personas
    const [searchKey, setSearchKey] = useState("");
    const [searchType, setSearchType] = useState("movie"); // Estado para el tipo de búsqueda (películas, actores, directores)
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState(null);
    const [person, setPerson] = useState(null); // Estado para la persona seleccionada (actor/director)
    const [playing, setPlaying] = useState(false);
    const [searched, setSearched] = useState(false);

    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        try {
            const { data: { results } } = await axios.get(`${apiUrl}/${type}/movie`, {
                params: {
                    api_key: apiKey,
                    query: searchKey,
                    language: "es",
                },
            });

            setMovies(results);
            setMovie(results[0]);

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
        setPerson(null); // Limpiar la persona seleccionada
        window.scrollTo(0, 0);
    };

    const selectPerson = async (person) => {
        setPerson(person);
        setMovies([]); // Limpiar los resultados de películas cuando se selecciona una persona
        setMovie(null); // Limpiar la película seleccionada
    };

    const searchItems = (e) => {
        e.preventDefault();
        setSearched(true);
        if (searchType === "movie") {
            fetchMovies(searchKey);
            setPerson(null); // Limpiar los resultados de actores/directores
        } else {
            fetchPeople(searchKey);
            setMovie(null); // Limpiar los resultados de películas
        }
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
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="movie">Películas</option>
                    <option value="person">Actores/Directores</option>
                </select>
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
                    ) : searched && person ? (
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
                                        <h4 className="text-center" id='movieTittle'>{movie.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : searched && !movie && !person ? (
                        <div className="container">
                            <h1 className="text-center" style={{ color: "white" }}>No se encontraron resultados</h1>
                        </div>
                    ) : null}
                </main>
            </div>

            <div className="container mt-3">
                <div className="row">
                    {searched && searchType === "movie" && movies.map((movie) => (
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
                    {searched && searchType === "person" && people.map((person) => (
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
                            <h4 className="text-center" id='personName'>{person.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;