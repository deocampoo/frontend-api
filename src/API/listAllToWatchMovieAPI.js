const listAllToWatchMovies = async (userId) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("access-token")}`);
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    let response = await fetch(`http://localhost:9000/api/toWatch/${userId}`, requestOptions);
    let jsonData = await response.json();
  
    return jsonData;
  }
  
  export default listAllToWatchMovies;