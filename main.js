// main.js
import { fetchBooks } from "./fetchBooks.js";
import { addFavorite } from "./favorites.js";

const grid = document.getElementById("booksGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Render books into the grid
function renderBooks(books) {
  grid.innerHTML = "";

  if (!books.length) {
    grid.innerHTML = `
      <p class="text-center text-gray-500 col-span-full text-lg">
        No results found for your search. Try another title!
      </p>
    `;
    return;
  }

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-lg transition p-4";

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}" class="w-full h-64 object-cover rounded mb-4">
      <h3 class="font-bold text-lg">${book.title}</h3>
      <p class="text-gray-500 text-sm italic mb-4">${book.author}</p>
      <button class="add-btn w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add to Favorites
      </button>
    `;

    // Add favorite functionality
    const addBtn = card.querySelector("button");
    addBtn.addEventListener("click", () => {
      addFavorite(book);
      alert(`"${book.title}" added to favorites!`);
    });

    grid.appendChild(card);
  });
}

// Attach favorite events to original hardcoded books
function attachOriginalFavorites() {
  const addButtons = grid.querySelectorAll(".add-btn");
  addButtons.forEach(button => {
    const book = {
      id: button.dataset.id,
      title: button.dataset.title,
      author: button.dataset.author,
      img: button.dataset.img
    };
    button.addEventListener("click", () => {
      addFavorite(book);
      alert(`"${book.title}" added to favorites!`);
    });
  });
}

// Run on page load for original books
attachOriginalFavorites();

// Search functionality
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) return;

  // Show loading state
  grid.innerHTML = `<p class="text-center text-gray-500 col-span-full text-lg">Searching books...</p>`;

  try {
    const books = await fetchBooks(query);
    renderBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    grid.innerHTML = `<p class="text-center text-red-500 col-span-full text-lg">
      Something went wrong while searching. Please try again later.
    </p>`;
  }
});