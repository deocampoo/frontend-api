const BASE_URL = "http://localhost:9000/api";
const getToken = () => sessionStorage.getItem("access-token");

const listAllMoviesAPI = async () => {
  let response = await fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
};

export default listAllMoviesAPI;
