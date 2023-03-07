# Bookshelf API Submission Documentation
- Navigation:
    - [Submission Criteria](#submission-criteria)
    - [Submission Notes](#submission-notes)

## Submission criteria:
1. Aplikasi menggunakan port 9000
2. Aplikasi dijalankan dengan perintah npm run start

```
{
  "name": "submission",
  ...
  "scripts": {
    "start": "node src/server.js",
    "start-dev": "nodemon src/server.js",
  }
}
```

gunakan 'start-dev' untuk menggunakan nodemon.

3. API dapat menyimpan buku (POST)
    - Method: POST
    - URL: /books
    - body request:
        ```
        {
            "name": string,
            "year": number,
            "author": string,
            "summary": string,
            "publisher": string,
            "pageCount": number,
            "readPage": number,
            "reading": boolean
        }
        ```
Objek buku yang ada pada server harus memiliki struktur seperti ini:
 
```
    {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "year": 2010,
        "author": "John Doe",
        "summary": "Lorem ipsum dolor sit amet",
        "publisher": "Dicoding Indonesia",
        "pageCount": 100,
        "readPage": 25,
        "finished": false,
        "reading": false,
        "insertedAt": "2021-03-04T09:11:44.598Z",
        "updatedAt": "2021-03-04T09:11:44.598Z"
    }
```
**insertedAt,updatedAt,id,finished** didapat dari server.
        
> Finished: readPage === pageCount.

> insertedAt: new Date().toISOString()

> id: nanoid

> updatedAt: insertedAt

- Server akan **gagal** bila:
    1. **Tidak** menampilkan properti pada *request body*
        - Status Code: 400
        - response body:
        ```
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
        ```
    2. readPage >= PageCount:
        - Status Code: 400
        - response body:
        ```
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
- Server **berhasil**:
    - Status Code: 201
    - Response Body:
    ```
    {
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
        }
    }
    ```

4. API Dapat menampilkan seluruh buku (GET)
- Method: GET
- URL: /books
- response: 
    - Success:
        - status Code: 200
        - response body:
        ```
        {
            "status": "success",
            "data": {
                "books": [
                    {
                        "id": "Qbax5Oy7L8WKf74l",
                        "name": "Buku A",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "1L7ZtDUFeGs7VlEt",
                        "name": "Buku B",
                        "publisher": "Dicoding Indonesia"
                    },
                    {
                        "id": "K8DZbfI-t3LrY7lD",
                        "name": "Buku C",
                        "publisher": "Dicoding Indonesia"
                    }
                ]
            }
        }
        ```
    - Fail:
        - response body:
        ```
        {
            "status": "success",
            "data": {
                "books": []
            }
        }
        ```

5. API dapat menampilkan detail buku (GET/id)
- method: GET
- path: /books/{bookId}
- IF book **NOT** found:
    - Status Code: 404
    - response body:
    ```
    {
        "status": "fail",
        "message": "Buku tidak ditemukan"
    }
    ```
- If book **FOUND**:
    - Status code:200
    - response body:
    ```
    {
        "status": "success",
        "data": {
            "book": {
                "id": "aWZBUW3JN_VBE-9I",
                "name": "Buku A Revisi",
                "year": 2011,
                "author": "Jane Doe",
                "summary": "Lorem Dolor sit Amet",
                "publisher": "Dicoding",
                "pageCount": 200,
                "readPage": 26,
                "finished": false,
                "reading": false,
                "insertedAt": "2021-03-05T06:14:28.930Z",
                "updatedAt": "2021-03-05T06:14:30.718Z"
            }
        }
    }
    ```

6. API dapat mengubah data buku(PUT/id)
- method: PUT
- URL: /books/{bookId}
- Body request:
    ```
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
    ```
- If **Fail**:
    - Client tidak melampirkan properti name:
        - Status Code: 400
        - response body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
        ```
    - readPage >= CountPage
        - Status Code: 400
        - response body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
        ```
    - Id yang dilampirkan tidak ada:
        - Status Code: 404
        - response body:
        ```
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
        ```
- if **Success**:
    - Status Code: 200
    - Response body:
    ```
    {
        "status": "success",
        "message": "Buku berhasil diperbarui"
    }
    ```

7. API dapat menghapus Buku (DELETE/id)
- method: DELETE
- URL: /books/{bookId}
- If **Gagal** (id not found):
    - Status Code: 404
    - Response Body:
    ```
    {
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }
    ```
- If **Berhasil** (ID dimiliki oleh salah satu buku):
    - Status Code: 404
    - Response Body:
    ```
    {
        "status": "success",
        "message": "Buku berhasil dihapus"
    }
    ```

8. Saran
- Tambahkan fitur query parameters pada route GET /books (Mendapatkan seluruh buku).
    - ?name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. Contoh /books?name=”dicoding”, maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive  (tidak peduli besar dan kecil huruf).
    - ?reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.
    - ?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.

- Menggunakan ESLint dan salah satu style guide agar gaya penulisan kode JavaScript lebih konsisten. Serta ketika dijalankan perintah berikut tidak terdapat error yang muncul. 

```
npx eslint 
```

- Pastikan di dalam folder proyek yang Anda kirim terdapat berkas package.json.
- Pastikan Anda hapus dulu berkas node_modules pada folder proyek sebelum mengkompresi dalam bentuk ZIP.

[Back to the top](#bookshelf-api-submission-documentation)

## Submission notes:
1. Module Requirements:
    - Hapi Framework
    - nodemon (Just for Development)
    - eslint (Mandatory for 5 Star)
    - nanoid v3.x.x (Mandatory for id)
    - [Postman-Collection-and-Env](https://github.com/dicodingacademy/a261-backend-pemula-labs/raw/099-shared-files/BookshelfAPITestCollectionAndEnvironment.zip)

2. Initiate:
    - Install **requirements**
    - Import [Postman-Collection-and-Env](BookshelfAPITestCollectionAndEnvironment) to POSTMAN ENV and Collection
    - Create .gitignore for **node_modules**
    - Create Project file. Folder Structure will look like this:
    ```
        ├── BookshelfAPITestCollectionAndEnvironment
        ├── node_modules
        ├── src
        │   ├── books.js
        │   ├── handler.js
        │   ├── routes.js
        │   ├── server.js
        ├── .eslintrc.json
        ├── .gitignore
        ├── package.json
        ├── package-lock.json 
        └── README.md
    ```

3. Progress Documentation

### Step 1: Add Book (POST)
- Project File:
    - [server.js](src/server.js):
        - This file will create server by Hapi Framework
        - Using port 9000
        - Need variable called routes from [routes.js](routes.js)
    - [routes.js](src/routes.js):
        - This file will create routes that needed for [server.js](server.js)
        - Need variable called addBooksHandler from [handler.js](handler.js)
    - [handler.js](src/handler.js):
        - This file will store all of handler (A handler is a function that is called whenever a specific route is requested. It is **responsible for handling the request and returning a response.**)
        - All of handler in this file will be export to [routes.js](routes.js)
        - Need variable called books from [books.js](books.js) because it's for save books
    - [books.js](src/books.js):
        - This file will store all of books that has been added in Array

    **NOTE:** 
    - In addBooksHandler:
        - Get data from request first,
        - Then, Initiate Data,
        - Make sure to check request data first (request.payload),
        - initiate another variable,
        - Create Response Fail with The condition of **Fail Request: Readpage>pageCount & name not found**,

        > If you want to check failed, **First** check request and **Second** check data, and so on.

        - Check Success Response,
        - Exports handler

### Step 2: Show All Book (GET)
- Project File:
    - [handler.js](src/handler.js):
        - Create getAllBookshandler for get all book data
    - [routes.js](src/routes.js):
        - Create routes for getAllBookshandler

    **NOTE:**
    - In getAllBookshandler:
        - Use .map() to show **several data**

    > Why not **.filter()** ? Because filter is Show ALL Data that pass the "Filter Requirements".
    > In the other side, **.map()** is show **Some data** that we choose. Like in this case is id, name, publisher.

### Step 3: Show Detail Book (GET/{id})
- Project File:
    - [handler.js](src/handler.js):
        - Create getBookbyIdHandler for get detail book data
    - [routes.js](src/routes.js):
        - Create routes for getBookbyIdHandler

    **NOTE:**
    - In getBookbyIdhandler:
        - Use **find** index to get **books data by id**

### Step 4: Update Book (POST/{id})
- Project File:
    - [handler.js](src/handler.js):
        - Create updateBookHandler for update data
    - [routes.js](src/routes.js):
        - Create routes for updateBookHandler

    **NOTE:**
    - In updateBookHandler:
        - **fail response (name, readpage > pageCount)** is placed after get **request.payload** because it's **has to validate the data** before the next step.
        - use **find** *index* to get specified Book by id -> return index != 0
        - find **books[index]** 

### Step 5: Delete Book (Delete/)
- Project File:
    - [handler.js](src/handler.js):
        - Create deleteBookHandler for delete data
    - [routes.js](src/routes.js):
        - Create routes for deleteBookHandler
    
    **NOTE:**
    - in deleteBookHandler:
        - use **find index** to get books by id
        - use **splice** to delete data by id

### Step 6: Query Parameter (?name) in GET All Data
Query parameter is request url for spesific request, so the data will be filtered based on the request. 

Example: dicoding.com/academy?name=Dhow

- Project File:
    - [handler.js](src/handler.js):
        - Create variable from **request.query**
        - Create condition for name
        - get data by name using **.filter()**
        - It's **has to non-case sensitive (ignore either lower/upper)**
        - use **.toLowerCase()** to both of data for make the data can non-case sensitive
        - use **.includes()** to create condition if **?name=Dicoding** is in the array books name **kelas dicoding/Dicoding jobs**  
    - [routes.js](src/routes.js):
        - Change path from **'/books' to '/{books?}'**

### Step 7: Query Parameter (?reading) in GET All Data
- Project File:
    - [handler.js](src/handler.js):
        - create condition for reading
        - use .filter() and !!Number to filter data by the condition

    **NOTE:**
    > Boolean() will convert all number **exclude 0/false** is true. Even tho it's string

    > !!Number will convert all falsy to false and truthy to true

    Example: Boolena('0') -> true, !!Number('0') -> false

### Step 7: Query Parameter (?finished) in GET All Data
- Project File:
    - [handler.js](src/handler.js):
        - create condition for finished
        - use .filter() and !!Number to filter data by the condition
        
    **NOTE:**
    Same note as ?reading