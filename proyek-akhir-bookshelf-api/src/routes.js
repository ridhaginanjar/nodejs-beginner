const { addBooksHandler, getAllBooksHandler,getBookbyIdHandler } = require('./handler.js');

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
        path: '/books/{bookid}',
        handler: getBookbyIdHandler
    }
];

module.exports = routes;