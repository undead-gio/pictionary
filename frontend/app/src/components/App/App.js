import React, { Component } from 'react';
import server from 'socket.io-client';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';
import Lobby from '../Lobby/Lobby'
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
    console.log(props)
    this.state = {
      master: null,
      username:'',
    };

  }
  socketConnection = () => {

    //sostituire msg con la parola da disegnare
    let receiveUsername = (_usr) => {
      this.setState({
        username: _usr,
      })
    }
    socket.emit('connection');
    socket.on('on', function (usr) {
      console.log(usr)
  })
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
          />
          <Header
            socket={socket}
            username={this.state.username}
            user={1}
          />
          <Canvas
            socket={socket}
            user={1}
          />
          <Chat
            socket={socket}
            user={1}
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
