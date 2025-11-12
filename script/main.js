// MovieApp class to manage fetching and displaying movies
class MovieApp {
  constructor(apiKey) {
    // API base URL and key
    this.apiUrl = "https://api.themoviedb.org/3";
    this.apiKey = apiKey;

    // DOM container where movie cards will be displayed
    this.container = document.querySelector("#cardsContainer");
  }

  // Fetch latest movies from TMDB
  async fetchLatestMovies() {
    try {
      const response = await fetch(
        `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`
      );
      const data = await response.json();

      // Take only the first 20 movies
      const movies = data.results.slice(0, 20);

      // Display movies in the container
      this.displayMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Create and append movie cards to the container
  displayMovies(movies) {
    // Clear previous cards
    this.container.innerHTML = "";

    movies.forEach((movie) => {
      // Movie title and poster
      const title = movie.title || movie.name;
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

      // Movie rating
      const rating = movie.vote_average || "N/A";

      // Create card element
      const card = document.createElement("div");
      card.className =
        "max-w-md rounded-lg shadow-md drop-shadow-md overflow-hidden text-black";

      // Set inner HTML of card
      card.innerHTML = `
        <div class="relative">
          <img src="${poster}" alt="${title}" class="h-64 w-full object-cover"/>
          <div class="absolute top-2 left-2 bg-red-600 text-white text-[6px] p-1 rounded">
            ⭐ ${rating}/10
          </div>
        </div>
        <div class="flex justify-around p-2">
          <div>
            <div class="text-gray-100 text-md font-bold text-center ab">
              ${title}
            </div>
          </div>
          <div>
            <span class="material-icons-only text-white/50 hover:text-red-600">add_box</span>
            <span class="material-icons-only text-white/50 hover:text-red-600">description</span>
          </div>
        </div>
      `;

      // Append card to container
      this.container.appendChild(card);
    });
  }
}

// Instantiate the class and fetch movies
const app = new MovieApp("09851300490c7f9b0c912f3f7d0a1325");
app.fetchLatestMovies();
