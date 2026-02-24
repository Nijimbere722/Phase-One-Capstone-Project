import { addFavorite } from "./favorites.js";

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const book = {
      id: button.dataset.id,
      title: button.dataset.title,
      author: button.dataset.author,
      img: button.dataset.img
    };
    addFavorite(book);
    alert(`"${book.title}" added to favorites!`);
  });
});