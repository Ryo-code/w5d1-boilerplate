const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 5000; // Set the port to 4000

const server = express() // Create a new express server
  .use(express.static('public'))  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server }); // Create the WebSockets server
const uuidV4 = require('uuid/v4');

wss.on('connection', (ws) => {  // Set up a callback that will run when a client connects to the server
  console.log('Client connected'); // When a client connects they are assigned a socket, represented by the ws parameter in the callback.

  let online_users = {howMany: `${wss.clients.length} user(s) online`,
type: "onlineUsers"}
  wss.broadcast(JSON.stringify(online_users));

  ws.on('message', function newMessage (msg){
    console.log("UNPARSED message:", msg);
    const message = JSON.parse(msg)
    // message['id'] = uuidV4();
    // console.log("Full parsed message with cray-cray ID:", message);
    // console.log("User " + message.username + " said "+ message.content);
    // wss.broadcast(JSON.stringify(message))

    switch (message.type) {
      case "postMessage":
        message.id = uuidV4();
        message.type = "incomingMessage";
        wss.broadcast(JSON.stringify(message))
        break;
      case "postNotification":
        message.type = "incomingNotification"
        wss.broadcast(JSON.stringify(message))
          break;
      default:

    }
  })

  ws.on('close', () => console.log('Client disconnected'));  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
});

wss.broadcast = function broadcast (data){
  wss.clients.forEach(function each(client){
    client.send(data);
  });
};
