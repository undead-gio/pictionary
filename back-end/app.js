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
    start = false,
    master,
    players;

// array of all lines drawn
var line_history = [];

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");



// event-handler for new incoming connections
io.on('connection', function (socket) {

  //socket.username = NAMES[Math.floor(Math.random() * NAMES.length)];

/*  socket.on('select username', function(data) {
    socket.username = data;
  });*/


  let connectedUsers = Object.values(io.sockets.sockets);
  // array of all player
  let allPlayers = connectedUsers.map((socket) => socket.username);

  // emit with socket the list of connected user
  io.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, start: start });
  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function(data) {
    if(socket.username == master){
      allPlayers = connectedUsers.map((socket) => socket.username);
      master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
      io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
      console.log(master + "new master")
      console.log(players)
    }
    // when a user disconnects I will be emitting the new total user
    connectedUsers = Object.values(io.sockets.sockets);
    // array of all player
    allPlayers = connectedUsers.map((socket) => socket.username);
    players = allPlayers.filter((player) => player !== master);
    // emit  with broadcast the new list of users connected
    io.sockets.emit('disconnect', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, master: master, players: players });
    console.log('disconnected ' + socket.username);
   });

   // event start when recive a message from frontEnd
   socket.on('start', function (data) {
     socket.username = data.username;
     connectedUsers = Object.values(io.sockets.sockets);
     allPlayers = connectedUsers.map((socket) => socket.username);
     if(!start){
       randomNumb = Math.floor(Math.random() * WORDS.length);
       master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
       start = true;
       io.sockets.emit('start', { username: socket.username, gameIsStart: true } );
     }
     players = allPlayers.filter((player) => player !== master);
     io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
     io.sockets.emit('word', { word: WORDS[randomNumb] });
     //console.log(allPlayers)
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
      io.sockets.emit('chat message', { type: "success", message: data, username: socket.username, finish: true, winner: socket.username, winWord: WORDS[randomNumb] });
      start = false;
      master = "";
      players = [];
    }
    else {
      // send message to all clients
      io.sockets.emit('chat message', { type: "info", message: data, username: socket.username });
    }
  });

  socket.on('game counter', function (data) {
    var counter = 100;
    var startCountdown = setInterval(function(){
      io.sockets.emit('counterGame', { counterGame: counter } );
      counter--;
      if (counter === 0) {
        io.sockets.emit('end', { message: "game over", finish: true });
        start = false;
        master = "";
        players = [];
        clearInterval(startCountdown);
      }
    }, 1500);
  })

});
