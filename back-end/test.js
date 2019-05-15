var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.use(cors());


var line_history = [];
var usersArray = [];
var totalUsers = 0,
    userId = 0,
    previousTotalUsers,
    connectedUsersArray,
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
var k=0;
// event start for new incoming connection
io.on('connection', function (socket){
  k ++;
  console.log(k);

  previousTotalUsers = totalUsers;
  totalUsers++;
  socket.username= NAME[Math.floor(Math.random() * NAME.length())];
  socket.id= userId++;
  socket.broadcast.emit('/', { totUser: totalUsers });
  connectedUsersArray = Object.keys(io.sockets.sockets);

  // event start when someone disconnect
  socket.on('disconnect', function() {
       totalUsers--;
       usersArray = [io.sockets.clients()];
       //connectedUsersArray = Object.getOwnPropertyNames(usersArray[0].server.nsps['/'].sockets);
       //When a user disconnects I will be emitting the new total user
       socket.broadcast.emit('disconnect', { totUser: totalUsers });
       console.log('cose connected');
   });

  // event start when recive a message from frontEnd
  socket.on('start', function (data) {
    var master = connectedUsersArray[Math.floor(Math.Random() * totalUsers)];
    io.sockets.emit('start', {  master: master});
  });

  socket.on('draw', function (data) {
    line_history.push(data.line); // add received line to history
    io.sockets.emit('draw', { line: data.line });  // send line to all clients
  });

  socket.on('chat', function (data) {
    if( data.message == WORDS[randomNumb] ){
      io.sockets.emit('/', { type: "outcome", win: true, winner: socket.username, winWord: WORDS[randomNumb] })
    }
    else {
      io.sockets.emit('/', { type: "chat", message: data.message, username: socket.username })
    }
    io.sockets.emit('chat', { message: data.message })
  });

  socket.on('word', function (data) {
      var numWords = WORDS.length();  // lennght of array words
      randomNumb = Math.floor(Math.random() * numWords);
      io.broadcast.emit('word', { word: WORDS[randomNumb] });
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
})
