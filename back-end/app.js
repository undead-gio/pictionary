var express = require('express'),
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);

//Array of words
var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];

// array of names for users
var NAMES = [
  "ciccio", "boro", "er'ciavatta", "er'ciofeca", "mi'zia", "secco", "tu'madre",
  "caciarone", "er'cipolla"
];

var randomNumb = Math.floor(Math.random() * WORDS.length);

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

  // assign random username to new connected user
  socket.username = NAMES[Math.floor(Math.random() * NAMES.length)];
  // total of connected user
  var totUser = io.engine.clientsCount;

  let connectedUsersArray = Object.values(io.sockets.sockets);
  // array of all player
  let allPlayer = connectedUsersArray.map((socket) => socket.username)

  console.log(allPlayer);
  console.log(Object.keys(io.sockets.sockets))
  // emit with socket the list of connected user
  socket.emit('connect', { totUser: connectedUsersArray.length, allPlayer: allPlayer });

  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function(data) {
    // when a user disconnects I will be emitting the new total user
    let connectedUsersArray = Object.values(io.sockets.sockets);
    // array of all player
    let allPlayer = connectedUsersArray.map((socket) => socket.username)
    // emit  with broadcast the new list of users connected
    //socket.broadcast.emit('disconnect', { user: socket.username, totUser: connectedUsersArray.length, allPlayer: allPlayer });
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
  socket.on('chat message', function (data) {
    if( data == WORDS[randomNumb] ){
      // send data of winner user and word
      console.log('you win')
      io.sockets.emit('chat message', { type: "success", message: data, username: socket.username, win: true, winner: socket.username, winWord: WORDS[randomNumb] })
    }
    else {
      // send message to all clients
      io.sockets.emit('chat message', { type: "info", message: data, username: socket.username })
    }
  });

});
