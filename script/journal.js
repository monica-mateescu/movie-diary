import { getFavourites } from "./favourites.js";

const main = document.querySelector("main");

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
      "max-w-xs sm:max-w-sm rounded-lg shadow-md drop-shadow-md overflow-hidden bg-[var(--lightgray)]";

    // Bild-URL wieder zusammensetzen, falls nur der Pfad gespeichert wurde
    const img = document.createElement("img");
    const imagePath = movie.image;
    img.src = imagePath.startsWith("http")
      ? imagePath
      : `https://image.tmdb.org/t/p/w500${imagePath}`;
    img.alt = movie.title;
    img.className = "w-full object-cover";

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

    card.appendChild(img);
    card.appendChild(body);

    grid.appendChild(card);
  });

  section.appendChild(grid);
}

renderJournal();
