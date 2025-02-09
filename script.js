const apiKey = "AIzaSyCOhOsTWoNJtOwOl4cqA7LMTlPq6qa5gwY";
        const searchInput = document.getElementById("search-bar");
        const searchButton = document.getElementById("search-btn");

        // Initialize storage if it doesn't exist
        if (!localStorage.getItem("library")) {
            localStorage.setItem("library", JSON.stringify([]));
        }

        // Function to safely store text that might contain quotes
        function safeString(str) {
            return str.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        }

        // Function to search books using Google Books API
        async function searchBooks() {
            const query = searchInput.value.trim();
            if (!query) return;

            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=6`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data.items) {
                    displaySearchResults(data.items);
                } else {
                    document.querySelector(".search-results").innerHTML = "<p>No books found</p>";
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                document.querySelector(".search-results").innerHTML = "<p>Error searching for books</p>";
            }
        }

        // Function to display search results
        function displaySearchResults(books) {
            const searchResults = document.querySelector(".search-results");
            searchResults.innerHTML = "";

            books.forEach(book => {
                const bookInfo = book.volumeInfo;
                const title = safeString(bookInfo.title || "No Title");
                const author = safeString(bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown Author");
                const thumbnail = bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x180";
                
                const bookCard = document.createElement("div");
                bookCard.classList.add("book");
                
                // Create book elements individually to avoid string interpolation issues
                const img = document.createElement("img");
                img.src = thumbnail;
                img.alt = title;
                
                const titleElem = document.createElement("h3");
                titleElem.textContent = title;
                
                const authorElem = document.createElement("p");
                authorElem.textContent = author;
                
                const addButton = document.createElement("button");
                addButton.textContent = "Add to Library";
                addButton.onclick = () => addToLibrary(title, author, thumbnail);
                
                // Append elements
                bookCard.appendChild(img);
                bookCard.appendChild(titleElem);
                bookCard.appendChild(authorElem);
                bookCard.appendChild(addButton);
                
                searchResults.appendChild(bookCard);
            });
        }

        // Function to add book to Local Storage
        function addToLibrary(title, author, thumbnail) {
            try {
                const book = {
                    title: title,
                    author: author,
                    thumbnail: thumbnail,
                    status: "to-read"
                };
                
                let library = JSON.parse(localStorage.getItem("library")) || [];
                
                // Check if book already exists
                if (!library.some(b => b.title === book.title)) {
                    library.push(book);
                    localStorage.setItem("library", JSON.stringify(library));
                    updateLibraryUI();
                    alert("Book added successfully!");
                } else {
                    alert("This book is already in your library!");
                }
            } catch (error) {
                console.error("Error adding book:", error);
                alert("There was an error adding the book. Please try again.");
            }
        }

        // Function to update UI with books from Local Storage
        function updateLibraryUI() {
            try {
                const library = JSON.parse(localStorage.getItem("library")) || [];
                
                // Clear existing book lists
                document.querySelectorAll(".book-container").forEach(container => container.innerHTML = "");

                library.forEach((book, index) => {
                    const bookCard = document.createElement("div");
                    bookCard.classList.add("book");
                    
                    // Create elements
                    const img = document.createElement("img");
                    img.src = book.thumbnail;
                    img.alt = book.title;
                    
                    const titleElem = document.createElement("h3");
                    titleElem.textContent = book.title;
                    
                    const authorElem = document.createElement("p");
                    authorElem.textContent = book.author;
                    
                    const select = document.createElement("select");
                    select.innerHTML = `
                        <option value="to-read" ${book.status === "to-read" ? "selected" : ""}>To Read</option>
                        <option value="reading" ${book.status === "reading" ? "selected" : ""}>Reading</option>
                        <option value="finished" ${book.status === "finished" ? "selected" : ""}>Finished</option>
                    `;
                    select.onchange = (e) => updateStatus(index, e.target.value);
                    
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove";
                    removeButton.onclick = () => removeBook(index);
                    
                    // Append elements
                    bookCard.appendChild(img);
                    bookCard.appendChild(titleElem);
                    bookCard.appendChild(authorElem);
                    bookCard.appendChild(select);
                    bookCard.appendChild(removeButton);
                    
                    const shelf = document.getElementById(book.status);
                    if (shelf) {
                        shelf.querySelector(".book-container").appendChild(bookCard);
                    }
                });
            } catch (error) {
                console.error("Error updating UI:", error);
            }
        }

        // Function to update book status
        function updateStatus(index, newStatus) {
            try {
                let library = JSON.parse(localStorage.getItem("library")) || [];
                library[index].status = newStatus;
                localStorage.setItem("library", JSON.stringify(library));
                updateLibraryUI();
            } catch (error) {
                console.error("Error updating status:", error);
                alert("There was an error updating the book status.");
            }
        }

        // Function to remove book from library
        function removeBook(index) {
            try {
                let library = JSON.parse(localStorage.getItem("library")) || [];
                library.splice(index, 1);
                localStorage.setItem("library", JSON.stringify(library));
                updateLibraryUI();
            } catch (error) {
                console.error("Error removing book:", error);
                alert("There was an error removing the book.");
            }
        }

        // Event Listeners
        searchButton.addEventListener("click", searchBooks);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") searchBooks();
        });

        // Initialize UI
        document.addEventListener("DOMContentLoaded", updateLibraryUI);