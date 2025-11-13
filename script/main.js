import {
  addToFavourites,
  getFavourites,
  isFavourite,
  removeFromFavourites,
} from "./favourites.js";

function getIconSize() {
  if (window.innerWidth < 640) {
    return "28px";
  } else if (window.innerWidth < 1024) {
    return "32px";
  } else {
    return "36px";
  }
}

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
  async fetchPopularMovies() {
    try {
      const response = await fetch(
        `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
      );
      const data = await response.json();

      // Take only the first 20 movies
      const movies = data.results.slice(0, 10);

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

      // Create the main card
      const card = document.createElement("div");
      card.className =
        "max-w-xs sm:max-w-sm md:max-w-md  rounded-lg shadow-md drop-shadow-md overflow-hidden text-black hover:scale-105 duration-300";

      // Relative wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "relative";

      // Poster image
      const img = document.createElement("img");
      img.src = poster;
      img.alt = title;
      img.className = "w-full object-cover";

      // Rating badge
      const ratingDiv = document.createElement("div");
      ratingDiv.className =
        "absolute top-2 left-2 bg-red-600 text-white text-[8px] p-1 rounded";
      ratingDiv.textContent = `⭐ ${rating.toFixed(1)}/10`;

      // Favorite icon
      const favIcon = document.createElement("span");
      favIcon.className =
        "material-icons-only cursor-pointer text-white hover:text-red-600";

      favIcon.title = "Add to Favorite";
      favIcon.textContent = "favorite";
      favIcon.style.fontSize = getIconSize();

      //============================================================
      //============ ADD FAVOURITES ================================
      //============================================================
      const alreadyFav = isFavourite(movie.id);
      if (alreadyFav) {
        favIcon.style.color = "red"; // nur Favoriten explizit färben
      }

      favIcon.addEventListener("click", () => {
        const movieObj = {
          id: movie.id,
          title: movie.title,
          image: movie.poster_path,
          info: movie.overview,
        };

        if (isFavourite(movie.id)) {
          removeFromFavourites(movie.id);
          favIcon.style.color = "";
        } else {
          addToFavourites(movieObj);
          favIcon.style.color = "red";
        }
      });

      // Description icon
      const descIcon = document.createElement("span");
      descIcon.className =
        "material-icons-only cursor-pointer text-white hover:text-red-600";

      descIcon.title = "Add Description";
      descIcon.textContent = "description";
      descIcon.style.fontSize = getIconSize();

      // ICON WRAPPER (NEU)
      const iconWrapper = document.createElement("div");
      iconWrapper.className =
        "absolute top-1 right-1 flex items-center gap-0.5 z-10";
      iconWrapper.appendChild(favIcon);
      iconWrapper.appendChild(descIcon);
      wrapper.appendChild(img);
      wrapper.appendChild(ratingDiv);
      wrapper.appendChild(iconWrapper);

      // Movie title section
      const titleDiv = document.createElement("div");
      titleDiv.className = "text-gray-100 text-sm font-bold text-center ab p-2";
      titleDiv.textContent = title;

      // Append all to card
      card.appendChild(wrapper);
      card.appendChild(titleDiv);

      // Finally add card to container
      this.container.appendChild(card);

      //   const card = document.createElement("div");
      //   card.className =
      //     "max-w-md rounded-lg shadow-md drop-shadow-md overflow-hidden text-black hover:scale-105 duration-300";

      //   // Set inner HTML of card
      //   card.innerHTML = `
      //     <div class="relative ">
      //       <img src="${poster}" alt="${title}" class="w-full object-cover"/>

      //       <div class="absolute top-2 left-2 bg-red-600 text-white text-[6px] p-1 rounded">
      //         ⭐ ${rating.toFixed(1)}/10
      //         </div>

      //         <span id class="absolute top-1 right-7  material-icons-only cursor-pointer text-white hover:text-red-600 hover:"  title="Add to Favorite">favorite</span>
      //         <span class="absolute top-1 right-2 material-icons-only cursor-pointer text-white hover:text-red-600" title="Add Description">description</span>

      //       </div>

      //         <div class="text-gray-100 text-sm font-bold text-center ab p-2">
      //           ${title}
      //            </div>
      //     </div>
      //   `;

      //   // Append card to container
      //   this.container.appendChild(card);
    });
  }
}

// Instantiate the class and fetch movies
const app = new MovieApp(API_KEY);
app.fetchPopularMovies();

// Responsive Design: Icons
window.addEventListener("resize", () => {
  document.querySelectorAll(".material-icons-only").forEach((icon) => {
    icon.style.fontSize = getIconSize();
  });
});
