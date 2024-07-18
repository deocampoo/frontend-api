const listAllToWatchMovies = async (userId) => {
  const response = await fetch(`/api/towatch/${userId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export default listAllToWatchMovies;