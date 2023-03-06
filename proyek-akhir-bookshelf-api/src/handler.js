const { nanoid } = require('nanoid');
const books = require('./books.js');

const addBooksHandler = (request,h) => {
    /*
    This handler is used for Add Books to API.
    The books object is :
        1. id -> by Server
        2. name
        3. year
        4. author
        5. summary
        6. publisher
        7. pageCount
        8. readPage
        9. finished = pageCound === readPage
        10. insertedAt = -> by Server
        11. updatedAt = insertedAt

    I will add coments to each step. So, see carefully when have comments with numbers

    */

    // 1. Initiate Data
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload; 
    //not { id }
    const id = nanoid(16);
    const finished = readPage === pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    //Check Request, Create Fail Response
    if (readPage > pageCount) {
        // Fail => readPage > pageCount
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response
    } 
    
    if(!name) {
        // Fail => Name is undefined
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response
    }
    
    // 2. If all is good, Then merge all data
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    };

    // 3. Push Data to books.js
    books.push(newBook);

    // Success Response
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId:id
            }
        });
        response.code(201);
        return response;
    } 
};

const getAllBooksHandler = (request, h) => { 
    const response = h.response({
        status: "success",
        data: {
            books:books.map((book)=> ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    });
    return response
};

const getBookbyIdHandler = (request, h) => {
    const { bookid } = request.params;
    const booksbyId = books.find((book) => book.id === bookid);

    if (booksbyId != undefined) {
        const response = h.response({
            status: "success",
            data:{
                book:booksbyId
            }
        });

        response.code(200)
        return response
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response
};

module.exports = { 
    addBooksHandler,
    getAllBooksHandler,
    getBookbyIdHandler
};