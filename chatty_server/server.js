const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

const PORT = 3001;

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

const wss = new SocketServer({ server });

// Allows for broadcast
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
};

// Tracks number of users
const trackLogins = () => {
  let numLoggedIn = {
    type: "sumOfUsers",
    content: wss.clients.size
  };

  return JSON.stringify(numLoggedIn);
};

// Websocket data in/out
wss.on("connection", ws => {
  wss.broadcast(trackLogins());

  let connectionMessage = {
    type: "notification",
    key: uuidv1(),
    content: "A new user has connected"
  };

  wss.broadcast(JSON.stringify(connectionMessage));

  // Client side data
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
          key: uuidv1(),
          content: incoming.content
        };

        let nameChange = {
          type: "nameChange",
          newUsername: incoming.newUsername
        };

        wss.broadcast(JSON.stringify(outgoingNotification));
        ws.send(JSON.stringify(nameChange));
        break;

      case "alert":
        let outgoingAlert = {
          type: "notification",
          key: uuidv1(),
          content: incoming.content
        };
        ws.send(JSON.stringify(outgoingAlert));
        break;

      default:
        throw new Error("Unknown event type: " + data.type);
    }
  });

  ws.on("close", () => {
    let connectionMessage = {
      type: "notification",
      key: uuidv1(),
      content: "A user has disconnected"
    };

    wss.broadcast(JSON.stringify(connectionMessage));
    wss.broadcast(trackLogins());
  });
});
