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

  return jsonData;  // Devuelve los datos de la respuesta sin almacenar el token
}

export default loginUser;
