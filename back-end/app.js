var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);

// array of names for users
var NAMES = [
  "ciccio", "boro", "er ciavatta", "er ciofeca", "mi'zia", "secco", "tu'madre",
  "caciarone", "er cipolla"
]

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

  // list of connected user
  let connectedUsersArray = Object.keys(io.sockets.sockets);
  // assign random username to new connected user
  socket.username = NAME[Math.floor(Math.random() * NAMES.length)];
  // emit with socket the list of connected user
  socket.broadcast.emit('connect', { totUser: connectedUsersArray.length });

  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function() {
       // when a user disconnects I will be emitting the new total user
       let connectedUsersArray = Object.keys(io.sockets.sockets);
       // emit  with broadcast the new list of users connected
       socket.broadcast.emit('disconnect', { totUser: connectedUsersArray.length });
       console.log('disconnected' + socket.username);
   });

  // add handler for message type "draw_line".
  socket.on('draw', function (data) {
    // add received line to history
    line_history.push(data.line);
    // send line to all clients
    io.emit('draw', { line: data.line });
  });

  // add handler for message type "chat".
  socket.on('chat message', function(msg){
  // send message to all clients
  io.emit('chat message', { msg: msg, username: socket.username });
  });

});
