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
    master,
    result; // name of master player

var line_history = [], // array of all lines drawn
    players = []; // array of other players

var winnerPlayer = ''; // save the username of the winner

// add directory with our static files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// event-handler for new incoming connections
io.on('connection', function (socket) {

  // define a random username on start of conection
  socket.username = makeid(7);
  // list of all connect socket
  let connectedUsers = Object.values(io.sockets.sockets);
  // array of all players
  let allPlayers = connectedUsers.map((socket) => socket.username);
  // filter the array of players and delet in this array the master name
  players = allPlayers.filter((player) => player !== master);

  // emit with socket the list of connected user
  io.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, start: start, master: master, players: players });

  // first send the history to the new client
  for (var i in line_history) {
    socket.emit('draw', { line: line_history[i] } );
  }

  // event start when someone disconnect
  socket.on('disconnect', function(data) {

    // when a user disconnects I will be emitting the new total user
    connectedUsers = Object.values(io.sockets.sockets);
    // array of all player
    allPlayers = connectedUsers.map((socket) => socket.username);
    // on disconnection of user check if he is the master player
    if(socket.username == master){

      // define new master
      master = allPlayers[Math.floor(Math.random() * allPlayers.length)];
      // filter the array of players and delet in this array the master name
      players = allPlayers.filter((player) => player !== master);
      // emit new data of master and players
      io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
    }
    // filter the array of players and delet in this array the master name
    players = allPlayers.filter((player) => player !== master);
    // emit the new list of users connected
    io.sockets.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, master: master, players: players });
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
       //master = null; // clean variable master
       master = socket.username; // assigns the master to the first that play start
       start = true; // set start true
       // emit socket start with username of starter player and a boolean to define the start of match
       io.sockets.emit('start', { username: socket.username, gameIsStart: true } );
       // filter the array of players and delet in this array the master name
       players = [];
       io.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, start: start, master: master, players: players });
       // start counter when the first player press start
       var counter = 100;
       var startCountdown = setInterval(function(){

         // emit every the seconds a gamecounter
         io.sockets.emit('counterGame', { counterGame: counter } );
         // decreases counter variable every the seconds
         counter--;

         // when the counter arrive to 0 the match finish and clean all the variable
         if ( counter === 0 ) {

           // emit on end the information of end match
           io.sockets.emit('end', { message: "game over", finish: true, winner:'No One', master:master, winWord: WORDS[randomNumb] });
           start = false;
           master = null;
           players = [];
           line_history=[];
           result = null;
           clearInterval(startCountdown);
         }

         if( result ){
           io.sockets.emit('end', { message: "game over", winner:winnerPlayer, finish: true, master:master, winWord: WORDS[randomNumb] });
           start = false;
           master = null;
           players = [];
           line_history=[];
           result = null;
           clearInterval(startCountdown);
         }
       }, 1000);
     }
     else{
       // filter the array of players and delet in this array the master name
       players = allPlayers.filter((player) => player !== master);
       io.emit('on', { totUser: connectedUsers.length, allPlayers: allPlayers, myUsername: socket.username, start: start, master: master, players: players });
     }


     // emit on play master, players and bool to close lobby of player that press start
     io.sockets.emit('play', {  master: master, players: players, dialogIsOpen: false });
     // emit on word the random word for game
     io.sockets.emit('word', { word: WORDS[randomNumb] });

    // pass to frontend the type of player
    if(socket.username == master){
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
    // lower case che message
    var dataLow = data.toLowerCase();

    // check if string contains substring
    result = dataLow.indexOf(WORDS[randomNumb]) > -1;
    console.log(result);
    // check if the message is the win word
    if( result ){
      // send data of winner user and word
      console.log('you win');
      io.sockets.emit('chat message', { type: "success", message: data, username: socket.username, finish: true, winner: socket.username, winWord: WORDS[randomNumb] });
      winnerPlayer=socket.username;
      io.sockets.emit('end', { message: "game over", winner:winnerPlayer, finish: true, master:master, winWord: WORDS[randomNumb] });
      // clean all the variable for new game
      console.log(winnerPlayer)
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

  // function to generate random string
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

});
