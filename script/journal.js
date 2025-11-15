import {
  getFavourites,
  removeFromFavourites,
  setupResponsiveIcons,
} from "./favourites.js";

import { addNoteToFavorite } from "./modules/ui.js";
import { searchForm, handleSearchFormSubmit } from "./modules/search.js";

const main = document.querySelector("main");

function getIconSize() {
  if (window.innerWidth < 640) {
    return "28px";
  } else if (window.innerWidth < 1024) {
    return "32px";
  } else {
    return "36px";
  }
}

function createJournalLayout() {
  const section = document.createElement("section");
  section.className = "container mx-auto px-4 py-8";

  const heading = document.createElement("h1");
  heading.textContent = "Favourite Movies";
  heading.className = "text-2xl md:text-3xl font-semibold mb-6";

  section.appendChild(heading);
  main.appendChild(section);

  return section;
}

function renderEmptyState(section) {
  const emptyMessage = document.createElement("p");
  emptyMessage.textContent =
    "You haven't added any favourite movies yet. Go back to the Homepage and add some! 😊";
  emptyMessage.className = "text-gray-300 text-sm";

  section.appendChild(emptyMessage);
}

function renderJournal() {
  const favourites = getFavourites();
  const section = createJournalLayout();

  if (!favourites.length) {
    renderEmptyState(section);
    return;
  }

  const grid = document.createElement("div");
  grid.className =
    "grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

  favourites.forEach((movie) => {
    const card = document.createElement("article");
    card.className =
      "max-w-xs sm:max-w-sm rounded-lg shadow-md drop-shadow-md overflow-visible bg-[var(--lightgray)]";

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    // === Movie Image ===
    const img = document.createElement("img");
    const imagePath = movie.image;
    img.src =
      typeof imagePath === "string" && imagePath.startsWith("http")
        ? imagePath
        : `https://image.tmdb.org/t/p/w500${imagePath}`;
    img.alt = movie.title;
    img.className = "w-full object-cover";

    const iconWrapper = document.createElement("div");
    iconWrapper.className =
      "absolute top-1 right-1 flex items-center gap-0.5 z-10";

    // === Icon Favourites ===
    const favIcon = document.createElement("span");
    favIcon.className =
      "material-icons-only icon-hover cursor-pointer text-white";
    favIcon.textContent = "favorite";
    favIcon.title = "Remove from favourites";
    favIcon.style.fontSize = getIconSize();
    favIcon.style.color = "red";

    // === Icon Notes ===
    const descIcon = document.createElement("span");
    descIcon.className =
      "material-icons-only icon-hover cursor-pointer text-white ";
    descIcon.textContent = "description";
    descIcon.title = "Add Description";
    descIcon.style.fontSize = getIconSize();

    // Add personal notes
    descIcon.addEventListener("click", () => {
      addNoteToFavorite(movie.id);
    });

    iconWrapper.appendChild(favIcon);
    iconWrapper.appendChild(descIcon);
    wrapper.appendChild(img);
    wrapper.appendChild(iconWrapper);

    // === Movie Info ===
    const body = document.createElement("div");
    body.className = "p-3";

    const title = document.createElement("h2");
    title.textContent = movie.title;
    title.className = "text-sm font-semibold text-gray-100 mb-2";

    const info = document.createElement("p");
    const text =
      typeof movie.info === "string" && movie.info.length > 180
        ? movie.info.slice(0, 180) + "..."
        : movie.info;
    info.textContent = text || "No description available.";
    info.className = "text-xs text-gray-200";

    body.appendChild(title);
    body.appendChild(info);
    card.appendChild(wrapper);
    card.appendChild(body);
    grid.appendChild(card);

    // === Remove Favourites ==============
    favIcon.addEventListener("click", () => {
      removeFromFavourites(movie.id);
      card.remove();

      if (!grid.children.length) {
        section.removeChild(grid);
        renderEmptyState(section);
      }
    });
  });

  section.appendChild(grid);
}

// Responsive Design: Icons
setupResponsiveIcons();

renderJournal();

searchForm.addEventListener("submit", handleSearchFormSubmit);
