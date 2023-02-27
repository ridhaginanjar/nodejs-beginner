# RESTful-API
This project is documentation for the implementation of Nodejs as Server-side development, Create RESTful-API. 

# Requirement
- Hapi Framework
- Nodemon for auto run server --DevDependencies
- nanoid for unique id

# Course Note 
## Step 1: add Note
- [server.js](server.js):
    - This file will create server
    - CORS (Cross-Origin Resource Sharing) will set in here
    - Need variable called routes from [routes.js](routes.js)
- [routes.js](routes.js):
    - This file will create routes that needed for [server.js](server.js)
    - Need variable called addNoteHandler from [handler.js](handler.js)
- [handler.js](handler.js):
    - This file will store all of handler (A handler is a function that is called whenever a specific route is requested. It is **responsible for handling the request and returning a response.**)
    - All of handler in this file will be export to [routes.js](routes.js)
    - Need variable called notes from [notes.js](note.js) because it's for save notes
- [note.js](notes.js):
    - This file will store all of notes that has been added
> **Same-Origin Policy**: is security measure that web browsers use to prevent scripts or content from one website or domain
> from accessing or interacting with content from another website or domain. 

This means that, by default, web pages can only access resources (like images, scripts,**port**, or other content) that originate from the same domain or website. If a website tries to access resources from a different domain, the browser will block it and display an error message.

```
response.header('Access-Control-Allow-Origin', '*');
```

## Step 2: show Notes
In this step, i also find some problem from previous step.
I have resolved this problem and the comment with **//** in handler.js is debug code
- [routes.js](routes.js):
    - Add GET method
    - add path to /notes and /notes/{id}
    - add handler getAllNotesHandler and getNotesByidHandler
- [handler.js](handler.js):
    - create getAllNotesHandler to get all notes data.
    this just return data: {notes} with status: "success".
    - create getNotesByidHandler to get notes by id. 
    It will return spesific notes, so i use filter method to filter notes by id.



# Full Course :
- [Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud](https://www.dicoding.com/academies/342)