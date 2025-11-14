const container = document.body;

const truncate = (text, maxLength) => {
  if (!text) return "";

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const createDialog = (movies) => {
  const dialog = document.createElement("dialog");
  const dialogContainer = document.createElement("div");
  const closeBtn = document.createElement("button");
  const moviesContainer = document.createElement("div");

  dialog.className =
    "fixed inset-0 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm z-50";
  dialogContainer.className =
    "bg-gray-700 rounded-lg w-full lg:w-2/3 max-h-[80vh] p-4 relative";
  closeBtn.className =
    "absolute top-4 right-4 bg-gray-600 hover:bg-red-600 rounded-lg px-2 text-gray-100 hover:text-white text-sm font-bold cursor-pointer";
  closeBtn.textContent = "x";

  moviesContainer.className = "overflow-y-auto max-h-[65vh] pr-2";

  if (movies.length === 0) {
    const p = document.createElement("p");
    p.className = "text-gray-100 pt-20";
    p.textContent = "No results found.";
    dialog.appendChild(p);
  } else {
    for (const movie of movies) {
      const { title, overview, poster_path, release_date } = movie;

      const article = document.createElement("article");
      const img = document.createElement("img");
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const span = document.createElement("span");
      const p = document.createElement("p");

      article.className = "flex lg:items-center border-b-2 border-gray-600 p-2";
      img.className = "self-start";
      div.className = "text-gray-100 pl-5 text-sm";
      h2.className = "text-sm font-semibold";
      span.className = "text-slate-100 text-xs";
      p.className = "mt-2";

      if (poster_path) {
        img.src = `https://image.tmdb.org/t/p/w92${poster_path}`;
        img.title = title;
        article.appendChild(img);
      }

      h2.textContent = title;
      span.textContent = release_date
        ? new Date(release_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "";
      p.textContent = truncate(overview, 250);

      div.appendChild(h2);
      div.appendChild(span);
      div.appendChild(p);

      article.appendChild(div);
      moviesContainer.appendChild(article);
    }
  }

  dialogContainer.appendChild(closeBtn);
  dialogContainer.appendChild(moviesContainer);
  dialog.appendChild(dialogContainer);
  container.appendChild(dialog);

  closeBtn.addEventListener("click", () => dialog.remove());
};

export { createDialog };
