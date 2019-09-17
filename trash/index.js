const http = require('http');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
console.log('rebuild 1');
console.log(__dirname);
console.log(__filename);
console.log(path.resolve(__dirname,""));
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World 1232\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});