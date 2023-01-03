const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const { v4: uuidv4 } = require('uuid');
const app = express();

const serverPort = process.env.PORT || 9000;


const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", ws => {
  ws.on("message", msg => {
    console.log("Recieved from client : %s", msg);
    let content; // only accepts content in a valid JSON format

    try {
      content = JSON.parse(msg);
    } catch (err) {
      console.log("Invalid JSON");
      content = {};
    }
    const {type, name, offer, ans, candidate} = content; 
    switch (type){
      case "login":
        if (users[name]) {
          sendMsg(ws, {
            type: "login",
            successful: false, 
            message: "Username already taken. Please choose another. "
          });
        } // username already exists
        else{
          const uid = uuidv4();
          const isLoggedIn = Object.values(
            users   
          ).map(({uid, name : username}) => ({uid, username}));
          users[name] = ws; 
          ws.name = name; 
          ws.id = uid; 

          sendMsg(ws, {
            type: "login",
            successful: true,
            users: isLoggedIn
          });
          broadcastMsg(users, "updateUsers", ws);
        }
        break;
      case "offer":
        const recipient = users[name];
        if (!!recipient){
          sendMsg(recipient, {
            type: "offer", 
            offer, 
            name: ws.name
          });
        } else {
          
        }
    }   

  });
  
  ws.send(   // feedback msg upon successful connection
    JSON.stringify({
      type: "connect",
      message: "Web Socket Server has been initialized"
    })
  );
});


server.listen(serverPort, () => {
  console.log(`Signaling Server running on port: ${serverPort}`);
});

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
});

app.get('/', function(req, res, next) {
    res.send("Hello world");
});

// create functions for basic chat operations

const sendMsg = (connection, msg) => {
  connection.send(JSON.stringify(msg));
};

const broadcastMsg = (clients, type, { id, name: username }) => {
  Object.values(clients).forEach(user => {
    if (user.name !== username) {
      user.send(
        JSON.stringify({
          type,
          user: { id, username }
        })
      );
    }
    
  });
};
