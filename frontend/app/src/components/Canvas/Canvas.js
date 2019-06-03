import React, { Component } from 'react';
class Canvas extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      isMaster: this.props.isMaster,
    };

  }
  canvasDrawing = () => {
    //initial settings
    var mouse = {
      click: false,
      move: false,
      pos: { x: 0, y: 0 },
      pos_prev: false
    };
    var canvas = document.getElementById('drawing');
    var context = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var socket = this.props.socket
    //setting canvas in full mode
    canvas.width = width;
    canvas.height = height;
    //write on canvas
    canvas.onmousedown = function (e) { mouse.click = true; };
    canvas.onmouseup = function (e) { mouse.click = false; };
    canvas.onmousemove = function (e) {
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
    };
    //receive data from server
    socket.on('draw', function (data) {
      var line = data.line;
      context.beginPath();
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
    });
    //magic!
    function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
        // send line to to the server
        socket.emit('draw', { line: [mouse.pos, mouse.pos_prev] });
        mouse.move = false;
      }
      mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
      setTimeout(mainLoop, 25);
    }
    mainLoop();
  }
  componentDidMount() {
    var socket = this.props.socket
    var component = this
    socket.on('isMaster', function (data) {
      component.setState({
        isMaster: data.isMaster
      })
    })
    this.canvasDrawing()

  }
  render() {
    let deactivate
    if (!this.state.isMaster) {
      deactivate = {
        height: '100%',
        background: 'rgba(158, 158, 158, 0.03)',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        zIndex: '1',
      };
    }
    return (
      <div className="Canvas" >
        <div style={deactivate}></div>
        <canvas id="drawing"></canvas>
      </div>
    );
  }
}

export default Canvas;
