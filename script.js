const myLibrary = loadLibrary() || [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  saveLibrary();
  displayBooks();
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; // Clear previous display

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <p><strong>Title: ${book.title}</strong></p>
      <p><strong>Author: ${book.author}</strong></p>
      <p><strong>Pages: ${book.pages}</strong></p>
      <p><strong>Read: ${book.read ? 'Yes' : 'No'}</strong></p>
      <button class="button primary-button" onclick="removeBook(${index})">Remove</button>
      <button class="button secondary-button" onclick="toggleReadStatus(${index})">Toggle Read Status</button>      
    `;
    libraryContainer.appendChild(bookCard);
  });
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
  const library = localStorage.getItem('myLibrary');
  return library ? JSON.parse(library) : null;
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLibrary();
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  saveLibrary();
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('new-book-modal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('new-book-modal').style.display = 'none';
});

document.getElementById('book-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  document.getElementById('new-book-modal').style.display = 'none';
  this.reset(); // Reset form after submission
});

// Close modal if clicked outside the form
window.addEventListener('click', (event) => {
  const modal = document.getElementById('new-book-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Initialize the library with initial books
if (myLibrary.length === 0) {
  const initialBook1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
  const initialBook2 = new Book('The Iliad', 'Homer ', 683, false);

  addBookToLibrary(initialBook1);
  addBookToLibrary(initialBook2);
}

// Display the books after initializing
displayBooks();
