# SOCTIONARY

A web version of famous table game "Pictionary", made in React and Socket.io;

![picture alt](http://3.bp.blogspot.com/-KXrcV7P7D4g/UPHGNqJYQhI/AAAAAAAADNk/31hEsDoE-ks/s1600/Pictionary.jpg "Title is an image, could be nosense.")

## Getting Started

These instruction will get you a copy of the project on your local machine, for developing, testing or just to have fun with your friends! 
This application is made of a frontend and a back-end, in the following lines you'll see how to make these working together.

## Download

As all git-hub projects, you can copy this repository on your computer by clicking on the "clone" button on top-right of this repository.

![picture alt](https://help.github.com/assets/images/help/repository/clone-repo-clone-url-button.png "can you see it?")

If it's your first time cloning a github repository, you can read this [very simple guide](https://help.github.com/en/articles/cloning-a-repository)

#### Installing packages
This program uses third parts libraries as dependencies, so before you launch it, you have to install all of that for both frontend and back-end application.

Assuming you have Node.js installed on your machine*, go to the project directory and move to the "frontend" folder by typing on your terminal:
```
cd frontend/app   
```

then istall dependencies with Node.js command:
```
npm install
```

Once it finishes, open a new terminal and repeat these steps starting from:
```
cd back-end
```
```
npm install
```

*if you don't have Node.js on your machine, you can [dowload it here](https://nodejs.org/it/download/)*


## Play

Now that you have all dependencies installed, just launch the applications and you are ready to play!

#### Launch frontend
Move to the frontend/app folder, as shown before, and type on your command line:
```
npm start
```

Your browser will open on the lobby page, but to connect to the game, start the server.

#### Launch back-end

Now it's back-end round, go to its folder and start it with the command:
```
node app.js
```

And that's all, now go to your browser, choose an username and start a match.


## The Game

Just a few lines to explain how this game works even if i'm sure you all know the famous table game "Pictionary"

### Structure
#### Lobby
When you connect with the server, you'll enter in a lobby where you can choose your username for the match, and see others players connected. When you are ready just press the start button to join the match.

#### Canvas
This is the paper where the designs appears. Only the Master can draw on it.

#### Chat
Here Players can try to guess the secret word or say what they want. If anyone writes the secret word, he wins and the game ends.

### Roles
#### Master
When a match start, one random player will be chosen to be the Master.
He is the only one who knows the secret word, and his aim is to make it guess the other players as quickly as possible.
Chat is not accessible for him.

#### Player 
Teir aim is to guess the word that the Master is drawing by the chat, in less time possible.

## Development
#### Build with
Here the list of frameworks we used to build this app.

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [Material-ui](https://material-ui.com/) - React components for faster and easier web development.
* [Socket.io](https://socket.io/) - Real-time, bidirectional and event-based communication.

## Autors

* Gioacchino Chirico - [undead-gio](https://github.com/undead-gio) 
* Gianlorenzo Comandini - [SempreBurrasca](https://github.com/SempreBurrasca)
* Matteo Foroni - [Efeex](https://github.com/Efeex)
* Alfonso Matteo - [alfonsomatteo](https://github.com/alfonsomatteo)

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
