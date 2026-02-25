// fetchBooks.js

export async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    return data.docs.map((doc, index) => ({
      id: doc.key || index,
      title: doc.title || "No Title",
      author: doc.author_name ? doc.author_name[0] : "Unknown Author",
      img: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : "Book1.png"
    }));

  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}


// NEW FUNCTION FOR POPULAR BOOKS
export async function fetchPopularBooks() {
  const url = `https://openlibrary.org/subjects/fiction.json?limit=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch popular books");

    const data = await response.json();

    return data.works.map((book, index) => ({
      id: book.key || index,
      title: book.title,
      author: book.authors?.[0]?.name || "Unknown Author",
      img: book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        : "Book1.png"
    }));

  } catch (error) {
    console.error("Popular books error:", error);
    return [];
  }
}