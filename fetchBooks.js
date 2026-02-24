// fetchBooks.js
export async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const books = data.docs.map((doc, index) => {
      // Use cover_i for Open Library cover image if available
      const img = doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : `Book${(index % 4) + 1}.png`; // fallback to local images

      return {
        id: doc.key || index, // unique ID
        title: doc.title || "No Title",
        author: doc.author_name ? doc.author_name[0] : "Unknown Author",
        img
      };
    });

    return books;
  } catch (error) {
    console.error("Error fetching books from API:", error);
    return [];
  }
}