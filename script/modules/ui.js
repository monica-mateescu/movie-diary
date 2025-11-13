const container = document.body;

const truncate = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const createDialog = (movies) => {
  const dialogContainer = document.createElement("div");
  const dialog = document.createElement("div");
  const closeBtn = document.createElement("button");

  dialogContainer.className =
    "fixed top-0 left-0 w-full h-full flex justify-center items-center";
  dialog.className =
    "bg-gray-700 rounded-lg p-4 w-2/3 h-2/3 overflow-y-auto relative";
  closeBtn.className =
    "absolute top-4 right-4 bg-gray-600 hover:bg-red-600 rounded-lg px-2 text-gray-100 hover:text-white text-sm font-bold cursor-pointer";
  closeBtn.textContent = "x";

  if (movies.length === 0) {
    const p = document.createElement("p");
    p.className = "text-gray-100 pt-20";
    p.textContent = "No results found.";
    dialog.appendChild(p);
  } else {
    for (const movie of movies) {
      const { title, overview, poster_path, release_date } = movie;

      const divContainer = document.createElement("div");
      const img = document.createElement("img");
      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const span = document.createElement("span");
      const p = document.createElement("p");

      divContainer.className =
        "flex items-center border-b-2 border-gray-600 p-2";
      div.className = "text-gray-100 pl-5 text-sm";
      h2.className = "text-sm font-semibold";
      span.className = "text-slate-100 text-xs";
      p.className = "mt-2";

      if (poster_path) {
        img.src = `https://image.tmdb.org/t/p/w92${poster_path}`;
        img.title = title;
        divContainer.appendChild(img);
      }

      h2.textContent = title;
      span.textContent = release_date
        ? new Date(release_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "";
      p.textContent = truncate(overview, 300);

      div.appendChild(h2);
      div.appendChild(span);
      div.appendChild(p);

      divContainer.appendChild(div);
      dialog.appendChild(divContainer);
    }
  }

  dialog.appendChild(closeBtn);
  dialogContainer.appendChild(dialog);
  container.appendChild(dialogContainer);

  closeBtn.addEventListener("click", () => dialogContainer.remove());
};

export { createDialog };
