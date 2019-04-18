import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';
import Header from '../Header/Header';

import './App.scss'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Canvas />
        <Chat />
      </div>
    );
  }
}

export default App;
