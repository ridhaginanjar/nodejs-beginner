const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
    const { title,tag,body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString;
    const updatedAt = createdAt;

    const newNote = {
        title,tag,body,id,createdAt,updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId:id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Catatan gagal ditambahkan',
        data: {
            noteId:id
        }
    });
    response.code(500);
    return response;    
};

module.exports = { addNoteHandler };