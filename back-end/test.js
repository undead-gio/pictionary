var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.use(cors());


var line_history = [],
    randomNumb;

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

var NAME = [
  "ciccio", "boro", "er ciavatta", "er ciofeca", "mi'zia", "secco", "tu'madre",
  "caciarone", "er cipolla"
]

// test html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// event start for new incoming connection
io.on('connection', function (socket){

  let connectedUsersArray = Object.keys(io.sockets.sockets);
  socket._data = {};
  socket._data.username = NAME[Math.floor(Math.random() * NAME.length];
  socket.broadcast.emit('connect', { totUser: connectedUsersArray.length });

  // event start when someone disconnect
  socket.on('disconnect', function() {

       //connectedUsersArray = Object.getOwnPropertyNames(usersArray[0].server.nsps['/'].sockets);
       //When a user disconnects I will be emitting the new total user
       let connectedUsersArray = Object.keys(io.sockets.sockets);
       socket.broadcast.emit('disconnect', { totUser: connectedUsersArray.length });
       console.log('disconnected');
   });

  // event start when recive a message from frontEnd
  socket.on('start', function (data) {
    var master = connectedUsersArray[Math.floor(Math.Random() * totalUsers)];
    var numWords = WORDS.length();  // lennght of array words
    randomNumb = Math.floor(Math.random() * numWords);
    io.sockets.emit('start', {  master: master });
    io.sockets.sockets[master].emit('word', { word: WORDS[randomNumb] });
  });

  socket.on('draw', function (data) {
    line_history.push(data.line); // add received line to history
    socket.broadcast.emit('draw', { line: data.line });  // send line to all clients
  });

  socket.on('chat', function (data) {
    if( data.message == WORDS[randomNumb] ){
      io.sockets.emit('chat', { type: "outcome", win: true, winner: socket.username, winWord: WORDS[randomNumb] })
    }
    else {
      io.sockets.emit('chat', { type: "chat", message: data.message, username: socket.username })
    }
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
})
