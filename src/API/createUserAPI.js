const createUser = async (email, password, recoveryAnswer) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    email: email,
    password: password,
    recoveryAnswer: recoveryAnswer
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
