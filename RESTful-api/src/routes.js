const { addNoteHandler, getAllNotesHandler,getNotesByidHandler,editNoteByidHandler } = require('./handler.js');

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
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByidHandler
    }
];

module.exports = routes;