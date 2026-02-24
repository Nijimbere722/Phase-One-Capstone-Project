export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === book.id)) {
    favorites.push(book);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

export function removeFavorite(bookId) {
  const favorites = getFavorites().filter(book => book.id !== bookId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}