'use strict';

const fs = require('node:fs');
const http = require('node:http');
const WebSocket = require('ws');

const index = fs.readFileSync('./index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(8000, () => {
  console.log('Listen port 8000');
});

const ws = new WebSocket.Server({ server });

ws.on('connection', (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);
  connection.on('message', (message) => {
    console.log('Received: ' + message);
    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;
      client.send(message, { binary: false });
    }
  });
  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
  });
});
