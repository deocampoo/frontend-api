const signOutUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    let response = await fetch("http://localhost:9000/api/auth/logoutUser", requestOptions);
    let jsonData = await response.json();
  
    if (response.ok) {
      sessionStorage.removeItem("access-token");
    }
  
    return jsonData;
  };
  
  export default signOutUser;
  