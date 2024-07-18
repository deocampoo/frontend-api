const deleteFavoriteMovie = async (userId, movieId, listType) => {
  const response = await fetch(`/api/${listType}/${userId}/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deleting movie');
  }
  const data = await response.json();
  return data;
};

export default deleteFavoriteMovie;
