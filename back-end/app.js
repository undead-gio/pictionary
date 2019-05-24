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

var randomNumb,
    start = false
    waitPlayers = [];

// array of all lines drawn
var line_history = [];

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");



// event-handler for new incoming connections
io.on('connection', function (socket) {

  socket.username = NAMES[Math.floor(Math.random() * NAMES.length)];

  if (start) {
    waitPlayers.push(socket.username);
    socket.emit('started', { waitPlayers: waitPlayers } );
  }

  let connectedUsers = Object.values(io.sockets.sockets);
  // array of all player
  let allPlayers = connectedUsers.map((socket) => socket.username);

  // emit with socket the list of connected user
  socket.emit('connect', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username });
  socket.emit('myUsername', { myUsername: socket.myUsername })

  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function(data) {
    // when a user disconnects I will be emitting the new total user
    connectedUsers = Object.values(io.sockets.sockets);
    // array of all player
    allPlayers = connectedUsers.map((socket) => socket.username)
    // emit  with broadcast the new list of users connected
    socket.emit('connect', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username });
    console.log('disconnected ' + socket.username);
   });

   // event start when recive a message from frontEnd
   socket.on('start', function (data) {
     var master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
     var players = allPlayers.filter((player) => player !== master)
     randomNumb = Math.floor(Math.random() * WORDS.length);
     io.sockets.emit('start', { username: socket.username } );

     var counter = 10;
     var startCountdown = setInterval(function(){
       io.sockets.emit('counterStart', { counterStart: counter } );
       counter--;
       if (counter === 0) {
         io.sockets.emit('play', {  master: master, players: players, status: false });
         io.sockets.emit('word', { word: WORDS[randomNumb] });
         start = true;

         clearInterval(startCountdown);
       }
     }, 1000);
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
      console.log('you win');
      io.sockets.emit('chat message', { type: "success", message: data, username: socket.username, win: true, winner: socket.username, winWord: WORDS[randomNumb] });
      start = false;
      waitPlayers = [];
    }
    else {
      // send message to all clients
      io.sockets.emit('chat message', { type: "info", message: data, username: socket.username });
    }
  });

  socket.on('game counter', function (data) {
    var counter = 120;
    var startCountdown = setInterval(function(){
      io.sockets.emit('counterStart', { gameCounter: counter } );
      counter--;
      if (counter === 0) {
        io.sockets.emit('end', { message: "game over", finish: true });
        start = false;
        waitPlayers = [];
        clearInterval(startCountdown);
      }
    }, 1000);
  })

});
