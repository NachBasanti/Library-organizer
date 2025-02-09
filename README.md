# Library-organizer
A simple web application to manage your personal book collection using the Google Books API. This application allows users to search for books, save them to their library, and track their reading progress.

## Features

- Search books using Google Books API
- Add books to your personal library
- Organize books into three categories:
  - To Read
  - Currently Reading
  - Finished
- Persistent storage using browser's Local Storage
- Responsive design for mobile and desktop
- Book management features:
  - Move books between shelves
  - Remove books from library
  - View book covers and author information


## Setup

1. Clone this repository or download the files:
   - `index.html`
   - `styles.css`

2. Replace the Google Books API key in `index.html`:
   ```javascript
   const apiKey = "YOUR_GOOGLE_BOOKS_API_KEY";
   ```

3. Open `index.html` in a web browser to start using the application.

## Usage

### Searching for Books
1. Enter a book title or author name in the search bar
2. Click the "Search" button or press Enter
3. Browse through the search results

### Adding Books to Library
1. Search for a book
2. Click "Add to Library" on any book 
3. The book will be automatically added to your "To Read" shelf

### Managing Books
1. Use the dropdown menu on each book card to move books between shelves
2. Click "Remove" to delete a book from your library
3. All changes are automatically saved to your browser's local storage

## Project Structure

```
personal-library/
│
├── index.html          # Main HTML file with JavaScript
├── styles.css         # Stylesheet
└── README.md          # Project documentation
```

## Features Explained

### Local Storage
- Books are stored in the browser's local storage
- Data persists even after closing the browser
- Format: Array of book objects with properties:
  - title
  - author
  - thumbnail
  - status

### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly interface
- Flexible grid layout for book displays

### Error Handling
- Validates API responses
- Handles network errors
- Prevents duplicate book entries
- Provides user feedback through alerts

## Known Limitations

1. Relies on browser local storage (data is browser-specific)
2. Limited to Google Books API search results
3. Requires an internet connection for book search
4. API key rate limits may apply
