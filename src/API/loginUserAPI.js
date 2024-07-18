import {jwtDecode} from 'jwt-decode';

const loginUser = async (email, password) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    email: email,
    password: password
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch("http://localhost:9000/api/auth/loginUser", requestOptions);
  let jsonData = await response.json();

  if (response.ok) {
    console.log("Token received: ", jsonData.token);
    sessionStorage.setItem("token", jsonData.token); // Almacena el token en sessionStorage
    const decoded = jwtDecode(jsonData.token);
    console.log("Decoded token: ", decoded);
    sessionStorage.setItem("userId", decoded.id); // Almacena el userId en sessionStorage
  }

  return jsonData;
}

export default loginUser;
