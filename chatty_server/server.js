const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 5000; // Set the port to 4000

const server = express() // Create a new express server
  .use(express.static('public'))  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server }); // Create the WebSockets server

wss.on('connection', (ws) => {  // Set up a callback that will run when a client connects to the server
  console.log('Client connected'); // When a client connects they are assigned a socket, represented by the ws parameter in the callback.

  ws.on('message', newMessage)

  ws.on('close', () => console.log('Client disconnected'));  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
});

function newMessage (message){
  console.log(message);
}
