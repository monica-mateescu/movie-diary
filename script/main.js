//======================================================================
//============= fetch API ==============================================
//======================================================================
async function fetchPopularMovies() {
  const url = `${API_URL}movie/popular?language=en-US&page=1`;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Fetched movies:", data.results);

    const container = document.getElementById("movies-container");
    // sicherer als innerHTML = ""
    container.textContent = "";

    data.results.slice(0, 8).forEach((movie) => {
      // === Card-Container ===
      const card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "shadow-md",
        "rounded-lg",
        "overflow-hidden",
        "hover:shadow-xl",
        "transition-shadow",
        "duration-300"
      );

      // === Poster ===
      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.alt = movie.title;
      img.classList.add("w-full", "h-72", "object-cover");

      // === Info-Container ===
      const info = document.createElement("div");
      info.classList.add("p-4");

      // === Titel ===
      const title = document.createElement("h3");
      title.textContent = movie.title;
      title.classList.add("text-lg", "font-semibold", "text-gray-800", "mb-2");

      // === Bewertung ===
      const rating = document.createElement("p");
      rating.textContent = `⭐ ${movie.vote_average} / 10`;
      rating.classList.add("text-sm", "text-gray-600");

      // === Zusammensetzen ===
      info.appendChild(title);
      info.appendChild(rating);
      card.appendChild(img);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

fetchPopularMovies();
