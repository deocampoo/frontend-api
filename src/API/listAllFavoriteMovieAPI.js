const listAllFavoriteMovie = async (userId) => {
  const response = await fetch(`/api/favorites/${userId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export default listAllFavoriteMovie;