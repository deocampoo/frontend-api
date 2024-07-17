
const deleteWatchedMovie = async (userId, movieId) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("access-token")}`);
  
    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    let response = await fetch(`http://localhost:9000/api/watched/${userId}/${movieId}`, requestOptions);
    let jsonData = await response.json();
  
    return jsonData;
  }
  
  export default deleteWatchedMovie;