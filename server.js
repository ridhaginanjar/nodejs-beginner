const http = require("http");

const requestListener = (request, response) => {
    response.setHeader("Content-Type", "text/html");
		const { method, url } = request;

		if(url === '/') { //Homepage
				if(method === 'GET') {
					response.statusCode = 200;
					response.end("Ini hompage");
				}
				else {
					response.statusCode = 400;
					response.end("Halaman belum siap");
				}
		} else if(url === '/data-engineer-portof') {
			if(method === 'GET') {
                response.statusCode = 200;
                response.end('<h1>Halo! Ini adalah halaman about</h1>')
            }
            else {
                response.statusCode = 400;
                response.end("Halaman Ga ada");
            }
        } else if(method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
                body.push(chunk);
            });
 
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
				response.statusCode = 200;
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
		} else {
				response.statusCode = 400;
				response.end("Halaman ga ada!")
		}
};


const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});