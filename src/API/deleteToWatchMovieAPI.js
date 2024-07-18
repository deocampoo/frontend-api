const deleteToWatchMovie = async (userId, movieId) => {
  const response = await fetch(`/api/towatch/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId }),
  });
  const data = await response.json();
  return data;
};

export default deleteToWatchMovie;