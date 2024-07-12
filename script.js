let books = [];
function addBook(title, author, isbn, publicationDate) {
    const book = {
        title,
        author,
        isbn,
        publicationDate
    };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}
function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const bookItem = document.createElement('li');
        bookItem.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn}) - Published on ${book.publicationDate}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteBook(index);
        });
        bookItem.appendChild(deleteButton);
        bookList.appendChild(bookItem);
    });
}
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}
document.getElementById('add-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const publicationDate = document.getElementById('publication-date').value;
    addBook(title, author, isbn, publicationDate);
    document.getElementById('add-book-form').reset();
});
document.addEventListener('DOMContentLoaded', () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        displayBooks();
    }
});