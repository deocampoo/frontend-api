const createUser = async (email, password) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    user: user,
    email: email,
    password: password,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let response = await fetch("http://localhost:9000/api/auth/createUser", requestOptions);
  let jsonData = await response.json();

  return jsonData;
}

export default createUser;
