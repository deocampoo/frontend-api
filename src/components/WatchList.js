import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WatchList = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";
    const maxMovies = 5;

    const [watchListMovies, setWatchListMovies] = useState([]);

    const fetchRandomMovies = async () => {
        const randomPage = Math.floor(Math.random() * 100) + 1; // Random page between 1 and 100
        const { data: { results } } = await axios.get(`${apiUrl}/discover/movie`, {
            params: {
                api_key: apiKey,
                language: 'es',
                page: randomPage,
            },
        });

        // Limitar el número de películas mostradas a 5
        const randomMovies = results.slice(0, maxMovies);
        setWatchListMovies(randomMovies);
        localStorage.setItem('watchListMovies', JSON.stringify(randomMovies)); // Guardar las películas en el localStorage
    };

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('watchListMovies'));
        if (storedMovies && storedMovies.length === maxMovies) {
            setWatchListMovies(storedMovies);
        } else {
            fetchRandomMovies();
        }
    }, []);

    return (
        <div>
            <h2 className="text-center mt-5 mb-5" style={{ color: 'white' }}>Por ver</h2>
            <div className="container mt-3">
                <div className="row">
                    {watchListMovies.map((movie) => (
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

export default WatchList;
