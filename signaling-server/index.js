const express = require("express");
const webSocket = require("ws");
const http = require("http");
const {v4: uuidv4} = require("uuid");
const app = express();
const PORT = process.env.PORT || 6060;
const server = http.createServer(app); // 

const webSocketServer = new webSocket.Server({server}); // initialize the web socket server to add onto app.

webSocketServer.on("connection:", ws => {
    ws.on("message", msg => {
        console.log(`Message received from client: ${msg}`);
    });

    ws.send(JSON.stringify({
        type: "connect", 
        message: "WebSocket server initialized."
        })
    );

});

server.listen(PORT, () => {  // event listener to handle incoming connections from clients. 
    console.log(`The server is running on port ${PORT}`);
});

let userList = {}; // keeps track of all connected users

app.get('/', function(req, res, next) {
    res.send("Hello world");
});

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
  });
