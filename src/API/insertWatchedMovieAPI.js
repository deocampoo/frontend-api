const insertWatchedMovie = async (userId, movie) => {
  const response = await fetch(`/api/watched/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  return data;
};
export default insertWatchedMovie;
