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
    "word", "letter", "number", "person", "pen", "people",
    "sound", "water", "place", "man", "woman", "boy",
    "girl", "year", "day", "week", "month", "name", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country",
    "school", "plant", "food", "sun", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "children", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "fire", "piece", "top", "bottom", "king",
    "space"
];

// array of names for users
var NAMES = [
  "ciccio", "boro", "er'ciavatta", "er'ciofeca", "mi'zia", "secco", "tu'madre",
  "caciarone", "er'cipolla"
];

var randomNumb, // random numb for define random game word
    start = false, // boolean to check if the game is start or not
    master; // name of master player

var line_history = [], // array of all lines drawn
    points = [], // obj for define name and points
    players = []; // array of other players

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// event-handler for new incoming connections
io.on('connection', function (socket) {

  // define a random username on start of conection
  socket.username = NAMES[Math.floor(Math.random() * NAMES.length)];

  // list of all connect socket
  let connectedUsers = Object.values(io.sockets.sockets);
  // array of all players
  let allPlayers = connectedUsers.map((socket) => socket.username);

  // emit with socket the list of connected user
  io.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, start: start });

  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function(data) {
    // on disconnection of user check if he is the master player
    if(socket.username == master){
      connectedUsers = Object.values(io.sockets.sockets);
      allPlayers = connectedUsers.map((socket) => socket.username);
      // assigns the new master
      master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
      // emit new data of master and players
      io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
    }

    // when a user disconnects I will be emitting the new total user
    connectedUsers = Object.values(io.sockets.sockets);
    // array of all player
    allPlayers = connectedUsers.map((socket) => socket.username);
    // filter the array of players and delet in this array the master name
    players = allPlayers.filter((player) => player !== master);
    // emit the new list of users connected
    io.sockets.emit('disconnect', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, master: master, players: players });
    console.log('disconnected ' + socket.username);
   });

   // event start when recive a message from frontEnd
   socket.on('start', function (data) {
     // if a data username is not empty
     if(data.username != ""){
       // assigns username with data of frontend input form
       socket.username = data.username;
     }
     // recalculate list of conncted users
     connectedUsers = Object.values(io.sockets.sockets);
     allPlayers = connectedUsers.map((socket) => socket.username);

     // if the play is not start, do this action only one time
     if(!start){
       // defined random word for play
       randomNumb = Math.floor(Math.random() * WORDS.length);
       master = null;
       master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
       start = true;
       io.sockets.emit('start', { username: socket.username, gameIsStart: true } );
     }

     players = allPlayers.filter((player) => player !== master);
     io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
     io.sockets.emit('word', { word: WORDS[randomNumb] });

    //pass to frontend the type of player
    if(socket.username== master){
      socket.emit('isMaster',{isMaster:true})
    } else{ socket.emit('isMaster',{isMaster:false}) }

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
      io.sockets.emit('end', { message: "game over", finish: true });
      start = false;
      master = null;
      players = [];
      line_history=[];
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
        master = null;
        players = [];
        line_history=[];
        clearInterval(startCountdown);
      }

    }, 1000);
  })

});
