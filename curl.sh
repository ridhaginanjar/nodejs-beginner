curl -X GET https://coffee-api.dicoding.dev/coffees -i
curl -X POST "Content-Type: application/json" -d "{\"name\": \"Kopi Tubruk\"}" https://coffee-api.dicoding.dev/coffees -i

#Output
: 'HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Vary: Accept-Encoding
X-Powered-By: Express
Access-Control-Allow-Origin: *
ETag: W/"bc-+nGU6AB86aQxzJjdtoq2u1HQvyU"
X-Cloud-Trace-Context: 15ccf145d9c0d899c01b59c50e0f2e31;o=1
Date: Sun, 03 Jan 2021 00:41:28 GMT
Server: Google Frontend
Content-Length: 188
Alt-Svc: h3-29=":443"; ma=2592000,h3-T051=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"
 
{"message":"Berikut daftar kopi yang tersedia","coffees":[{"id":1,"name":"Kopi Tubruk","price":12000},{"id":2,"name":"Kopi Tarik","price":15000},{"id":3,"name":"Kopi Jawa","price":18000}]}'