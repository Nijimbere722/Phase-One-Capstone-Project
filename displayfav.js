import { getFavorites, removeFavorite } from "./favorites.js";

const grid = document.getElementById("favoritesGrid");
const emptyState = document.getElementById("emptyState");

function renderFavorites() {
  const favorites = getFavorites();
  grid.innerHTML = "";

  if (favorites.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 border border-gray-100";

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}" class="w-full h-64 object-cover rounded mb-4">
      <h3 class="font-bold text-lg">${book.title}</h3>
      <p class="text-gray-500 text-sm italic mb-4">${book.author}</p>
      <button class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
        Remove from Favorites
      </button>
    `;

    const removeBtn = card.querySelector("button");
    removeBtn.addEventListener("click", () => {
      removeFavorite(book.id);
      renderFavorites(); // re-render after removal
    });

    grid.appendChild(card);
  });
}

// Initial render
renderFavorites();