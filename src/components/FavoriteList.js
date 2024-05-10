import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FavoriteList = () => {
    const apiUrl = "https://api.themoviedb.org/3";
    const apiKey = "4f5f43495afcc67e9553f6c684a82f84";
    const imagePath = "https://image.tmdb.org/t/p/original";
    const maxMovies = 5;

    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const fetchRandomMovies = async () => {
        const { data: { results } } = await axios.get(`${apiUrl}/movie/now_playing`, {
            params: {
                api_key: apiKey,
                language: 'es',
            },
        });

        // Limitar el número de películas mostradas a 5
        const randomMovies = results.slice(0, maxMovies);
        setFavoriteMovies(randomMovies);
        localStorage.setItem('favoriteMovies', JSON.stringify(randomMovies)); // Guardar las películas en el localStorage
    };

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
        if (storedMovies && storedMovies.length === maxMovies) {
            setFavoriteMovies(storedMovies);
        } else {
            fetchRandomMovies();
        }
    }, []);

    return (
        <div>
            <h2 className="text-center mt-5 mb-5" style={{ color: 'white' }}>Lista de Favoritas</h2>
            <div className="container mt-3">
                <div className="row">
                    {favoriteMovies.map((movie) => (
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

export default FavoriteList;
