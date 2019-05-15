import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import Header from '../Header/Header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.scss'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00bcd4' }, 
    secondary: { main: '#00e676' },
  },
});
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Header />
          <Canvas />
          <Chat />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
