import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Watched = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";
    const harryPotterQuery = 'Harry Potter';
    const maxHarryPotterMovies = 4;

    const [harryPotterMovies, setHarryPotterMovies] = useState([]);

    const fetchHarryPotterMovies = async () => {
        const { data: { results } } = await axios.get(`${apiUrl}/search/movie`, {
            params: {
                api_key: apiKey,
                language: 'es',
                query: harryPotterQuery,
            },
        });

        // Limitar el número de películas mostradas a 4
        const limitedResults = results.slice(0, maxHarryPotterMovies);
        setHarryPotterMovies(limitedResults);
    };

    useEffect(() => {
        fetchHarryPotterMovies();
    }, []);

    return (
        <div>
            <h2 className="text-center mt-5 mb-5" style={{ color: 'white' }}>Vistas</h2>
            <div className="container mt-3">
                <div className="row">
                    {harryPotterMovies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-3">
                            <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} height={600} width="100%" />
                            <h4 className="text-center" style={{ color: 'white' }}>{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Watched;
