const BASE_URL = "http://localhost:9000/api";
const getToken = () => sessionStorage.getItem("access-token");

export const fetchMovieById = async (movieId) => {
    let response = await fetch(`${BASE_URL}/movies/${movieId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  };