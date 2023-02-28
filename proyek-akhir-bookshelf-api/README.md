# Bookshelf API Submission Documentation
Submission criteria:
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
    - url: /books
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
- Server berhasil:
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
- IF book **not** found:
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
- Url: /books/{bookId}
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