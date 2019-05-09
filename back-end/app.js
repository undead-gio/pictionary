var express = require('express');
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(server);
var app = express();

app.use(cors());


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
// event start for new incoming connection
io.on('connection', function (socket){
  console.log('New user connected');

  //previousTotalUsers = totalUsers;
  totalUsers++;
  socket.username= NAME[Math.floor(Math.random() * NAME.lenght())];
  socket.id= userId++;
  socket.broadcast.emit('/', { totUser: totalUsers });
  connectedUsersArray = Object.keys(io.sockets.sockets);

  // event start when someone disconnect
  socket.on('disconnect', function() {
       totalUsers--;
       usersArray = [io.sockets.clients()];
       //connectedUsersArray = Object.getOwnPropertyNames(usersArray[0].server.nsps['/'].sockets);
       //When a user disconnects I will be emitting the new total user
       socket.broadcast.emit('/', totalUsers);
   });

  // event start when recive a message from frontEnd
  socket.on('/', function (data) {
    // switch case to controll the type of message, and do for specific type specific operation
    switch (data.msgType) {

      case "draw":
        line_history.push(data.line); // add received line to history
        io.sockets.emit('/', { line: data.line });  // send line to all clients
        break;

      case "chat":
        if( data.message == WORDS[randomNumb] ){
          io.sockets.emit('/', { win: true, winner: socket.username, winWord: WORDS[randomNumb] })
        }
        else {
          io.sockets.emit('/', { message: data.message, username: socket.username })
        }
        break;

      case "master":
        var master = connectedUsersArray[Math.floor(Math.Random() * totalUsers)]
        io.sockets.emit('/', { master: master})
        break;

      case "word":
        var numWords = WORDS.lenght();  // lennght of array words
        randomNumb = Math.floor(Math.random() * numWords);
        io.broadcast.emit('/', { word: WORDS[randomNumb] });
        break;

      default:
        console.log("not correct data")
    }
  });

});

/*var expressWs = require('express-ws')(app);
var aWss = expressWs.getWss('/');
app.ws('/', function(req, res) {
  switch (res) {
    case "chat":
      chat(res.message);
      break

    case "draw":
      //inviare a tutti tranne che al master cordinate x e y per il canvas
      break;

    case "master":
      //controllo della listra di client e assegnare ad uno random il master
      break

    case "word":
      //inviare solo al master una parole scelta random da un dizionario predefinito
      word(res)
      break
  }
});

function chat = (res) => {
  if(res == rdmWord){
    "vincitore";
  }
  else{
    ws.on('message', function(msg) {
      aWss.clients.forEach(function (client) {
        client.send(msg);
      });
    });
  };
}*/


app.listen(3000);
