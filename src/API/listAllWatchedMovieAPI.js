const listAllWatchedMovies = async (userId) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("access-token")}`);
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    let response = await fetch(`http://localhost:9000/api/watched/${userId}`, requestOptions);
    let jsonData = await response.json();
  
    return jsonData;
  }
  
  export default listAllWatchedMovies;