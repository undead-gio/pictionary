import React, { Component } from 'react';
import Canvas from '../Canvas/Canvas';
import Chat from '../Chat/Chat';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
        <Chat />
      </div>
    );
  }
}

export default App;
