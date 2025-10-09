// In-memory database for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', publishedYear: 1949 }
];

let nextId = 4;

module.exports = {
    books,
    nextId
};