const listAllWatchedMovies = async (userId) => {
  const response = await fetch(`/api/watched/${userId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
export default listAllWatchedMovies;