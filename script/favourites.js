// FR012 AUFGABE
// Add "favourites” button
// Store movies (as objects) in an array inside localStorage

export function getFavourites() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}

export function addFavourites(currentFavs, movieObj) {
  return [...currentFavs, movieObj];
}

export function saveFavourites(newFavs) {
  localStorage.setItem("favs", JSON.stringify(newFavs));
}

export function isFavourite(id) {
  const favs = getFavourites();
  return favs.some((fav) => fav.id === id);
}

export function removeFromFavourites(id) {
  const favs = getFavourites();
  const newFavs = favs.filter((fav) => fav.id !== id);
  saveFavourites(newFavs);
}

export function addToFavourites(movieObj) {
  const currentFavs = getFavourites();
  const newFavs = addFavourites(currentFavs, movieObj);
  saveFavourites(newFavs);
}
