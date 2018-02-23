const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );
// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
};

const trackLogins = () => {
  let numLoggedIn = {
    type: "sumOfUsers",
    content: wss.clients.size
  };

  return JSON.stringify(numLoggedIn);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected!");

  wss.broadcast(trackLogins());

  let connectionMessage = {
    type: "login",
    key: uuidv1(),
    content: "Someone has connected"
  };

  wss.broadcast(JSON.stringify(connectionMessage));

  ws.on("message", data => {
    let incoming = JSON.parse(data);
    switch (incoming.type) {
      case "message":
        let outgoingMessage = {
          type: "message",
          key: uuidv1(),
          username: incoming.username,
          content: incoming.content
        };
        wss.broadcast(JSON.stringify(outgoingMessage));
        break;

      case "notification":
        let outgoingNotification = {
          type: "notification",
          newUsername: incoming.newUsername,
          key: uuidv1(),
          content: incoming.content
        };
        ws.send(JSON.stringify(outgoingNotification));
        break;

      default:
        throw new Error("Unknown event type: " + data.type);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    trackLogins();
    console.log("Client disconnected :(");
  });
});
