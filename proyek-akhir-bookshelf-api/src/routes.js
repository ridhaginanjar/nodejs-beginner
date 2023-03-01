const { addBooksHandler } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
    },
];

module.exports = routes;