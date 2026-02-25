import { fetchBooks, fetchPopularBooks } from "./fetchBooks.js";
import { addFavorite } from "./favorites.js";

const grid = document.getElementById("booksGrid");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

function renderBooks(books) {
  grid.innerHTML = "";

  if (!books.length) {
    grid.innerHTML = `
      <p class="text-center text-gray-500 col-span-full text-lg">
        No books found.
      </p>
    `;
    return;
  }

  books.forEach(book => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-lg transition p-4";

    card.innerHTML = `
      <img src="${book.img}" alt="${book.title}" 
           class="w-full h-64 object-cover rounded mb-4"
           onerror="this.src='Book1.png'">
      <h3 class="font-bold text-lg">${book.title}</h3>
      <p class="text-gray-500 text-sm italic mb-4">${book.author}</p>
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add to Favorites
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      addFavorite(book);
      alert(`"${book.title}" added to favorites!`);
    });

    grid.appendChild(card);
  });
}


// LOAD POPULAR BOOKS ON PAGE LOAD
async function loadPopularBooks() {
  grid.innerHTML = `
    <p class="text-center text-gray-500 col-span-full text-lg">
      Loading popular books...
    </p>
  `;

  const books = await fetchPopularBooks();
  renderBooks(books);
}


// SEARCH
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) return;

  grid.innerHTML = `
    <p class="text-center text-gray-500 col-span-full text-lg">
      Searching books...
    </p>
  `;

  const books = await fetchBooks(query);
  renderBooks(books);
});

// Run when page loads
loadPopularBooks();