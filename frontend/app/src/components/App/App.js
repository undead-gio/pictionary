import React, { Component } from 'react';
import server from 'socket.io-client';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';
import Lobby from '../Lobby/Lobby'
import Word from '../Word/Word';
import Timer from '../Timer/Timer'
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
    };

  }
  socketConnection = () => {
    var socket = this.props.socket
    //sostituire msg con la parola da disegnare
    let receiveMaster = (master) => {
      this.setState({
        master: master,
      })
    }
    socket.on('start', function (master) {
      receiveMaster((master))
    })
  }
  componentDidMount() {
    //this.socketConnection()
  }
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Lobby  socket={socket} user={1}/>
          <Header />
          <Timer
            socket={socket}
            user={1}
          />
          <Word
            socket={socket}
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
