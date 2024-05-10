import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const Series = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";
    const urlImage = "https://image.tmdb.org/t/p/original";

    const [series, setSeries] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [serie, setSerie] = useState({ name: "Cargando series" });
    const [playing, setPlaying] = useState(false);
    const fetchSeries = async () => {
        try {
            const { data: { results } } = await axios.get(`${apiUrl}/discover/tv`, {
                params: {
                    api_key: apiKey,
                    language: 'es',
                    sort_by: 'popularity.desc', // Ordenar por popularidad descendente (las más populares primero)
                },
            });
    
            console.log("Series más populares:", results); // Verificar si se obtienen las series correctamente
    
            setSeries(results);
            setSerie(results[0]);
    
            if (results.length) {
                await fetchSerie(results[0].id);
            }
        } catch (error) {
            console.error("Error al obtener las series:", error);
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
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        setSerie(data);
    };

    const selectSerie = async (serie) => {
        fetchSerie(serie.id);
        setSerie(serie);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        fetchSeries();
    }, []);

    return (
        <div>
            <h2 className="text-center mt-5 mb-5" id="title" style={{ color: 'white' }}>Series de televisión</h2>

            <div>
                <main>
                    {serie ? (
                        <div
                            className="viewtrailer"
                            style={{
                                backgroundImage: `url("${imagePath}${serie.backdrop_path}")`,
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
                                        <h1 className="text-white">{serie.name}</h1>
                                        <p className="text-white">{serie.overview}</p>
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
                            className="col-md-4 mb-3"
                            onClick={() => selectSerie(serie)}
                        >
                            <img
                                src={`${urlImage + serie.poster_path}`}
                                alt={serie.name}
                                height={600}
                                width="100%"
                            />
                            <h4 className="text-center" style={{ color: 'white' }}>{serie.name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Series;

