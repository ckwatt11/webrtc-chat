const express = require("express");
const webSocket = require("ws");
const http = require("http");
const {v4: uuidv4} = require("uuid");
const app = express();
const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // 

const webSocketServer = new WebSocket.Server({server}); // initialize the web socket server to add onto app.

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

server.listen(port, () => {
    console.log(`The server is running on port ${PORT}`);
});