const { addBooksHandler, getAllBooksHandler,getBookbyIdHandler, updateBookHandler } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookbyIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookHandler
    },
];

module.exports = routes;