import React, { Component } from 'react';
import server from 'socket.io-client';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';
import Header from '../Header/Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.scss'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00bcd4' }, 
    secondary: { main: '#00e676' },
  },
});
//connection to socket
var io = server('http://localhost:8080')
var socket  = io.connect()
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Header />
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
