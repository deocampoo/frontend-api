const insertFavoriteMovie = async (userId, movie) => {
  const response = await fetch(`/api/favorites/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error inserting movie');
  }
  const data = await response.json();
  return data;
};

export default insertFavoriteMovie;
