const http = require('http');
const fs = require('fs');

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
