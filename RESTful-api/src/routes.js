const { addNoteHandler } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
];

module.exports = routes;