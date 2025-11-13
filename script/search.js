import { fetchSearchMovie } from "./modules/network.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");

const handleSearchFormSubmit = (e) => {
  e.preventDefault();

  const val = searchInput.value.trim();

  if (!val) {
    return;
  }

  fetchSearchMovie(val);

  searchForm.reset();
};

searchForm.addEventListener("submit", handleSearchFormSubmit);
