import jwtDecode from "jwt-decode";

const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("access-token"); // Asegúrate de estar almacenando el token en sessionStorage
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Asegúrate de que el token contiene el campo 'id' con el ID del usuario
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default getUserIdFromToken;
