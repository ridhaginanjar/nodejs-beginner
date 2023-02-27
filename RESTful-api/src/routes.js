const { addNoteHandler, getAllNotesHandler,getNotesByidHandler } = require('./handler.js');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByidHandler
    }
];

module.exports = routes;