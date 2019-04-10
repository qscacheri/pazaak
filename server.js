/*
Created by Sam DeLong
*/

//Yahdeyaa setup socket.io and express for web server
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var numPlayers = 0;
app.set('port', 5941);
/* Giveuser access to files...
   If you were going to do this *not* on github you wouldn't want to allow them to see server.js (just saying)
*/
app.use('/', express.static(__dirname + '/'));

//What file to send users
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Star listening on port 80 for web stuff
server.listen(3000, function() {
  console.log('starting webserver');
});


//define users as JSON array
let users = {};

//create socket callbacks...
io.on("connection", (socket) => {
    console.log(`Someone connected! Their id is: ${socket.id}`);
    if (numPlayers+1>2){
      "Game is already full"
    }
    numPlayers++;


    socket.on('info',(info) => {

    });

    socket.on("disconnect", () => {

      //Someone disconnected
      var temp = {};

      //Remove the disconnected user from the users obj
      for(var id in users){
        if(id != socket.id){
          temp[id] = users[id];
        }
      }
      
       //Set users array to temporary array, which doesn't have the disconnected user
      users = temp;
      console.log(`Someone disconnected... ${socket.id}`);

    });
});

// sends all of the users the mouse positions of the users...
setInterval(() => {

  io.sockets.emit("users",users);

}, 1000/60);
