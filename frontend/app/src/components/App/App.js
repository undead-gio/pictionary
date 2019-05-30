import React, { Component } from 'react';
import server from 'socket.io-client';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import Dialog from '../Dialog/Dialog'
import Header from '../Header/Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.scss'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00bcd4' },
    secondary: { main: '#00e676' },
  },
  overrides: {
    MuiSnackbar: {
      anchorOriginBottomRight: {
        marginBottom: '10%',
      }
    }
  }
});
//connection to socket
var io = server('http://localhost:8080')
var socket = io.connect()
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      master: null,
      username: '',
      gameIsStart: false,
    };

  }
  saveUsername = (_usr) =>{
    this.setState({
      username: _usr,
    })
    console.log('username saved :'+_usr)
  }
  socketConnection = () => {
    var component = this
    socket.emit('connection');
    socket.on('start', function (usr) {
      component.setState({
        gameIsStart: usr.gameIsStart,
      })
    })
    if (this.state.gameIsStart) {
      socket.emit('game counter')
      console.log('inizia la partita')
    }
  }
  componentDidMount() {
    this.socketConnection()
  }
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          {/*<Lobby  socket={socket} user={1}/>*/}
          <Dialog
            socket={socket}
            user={1}
            action={this.saveUsername.bind(this)}
            gameIsStart={this.state.gameIsStart}
          />
          <Header
            socket={socket}
            username={this.state.username}
            user={1}
            gameIsStart={this.state.gameIsStart}
          />
          <Canvas
            socket={socket}
            user={1}
            gameIsStart={this.state.gameIsStart}
          />
          <Chat
            socket={socket}
            user={1}
            gameIsStart={this.state.gameIsStart}
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
