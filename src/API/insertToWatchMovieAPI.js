const insertToWatchMovie = async (userId, movie) => {
  const response = await fetch(`/api/towatch/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  const data = await response.json();
  return data;
};
export default insertToWatchMovie;
