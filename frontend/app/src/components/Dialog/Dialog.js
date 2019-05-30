import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Timer from '../Timer/Timer'
import Lobby from '../Lobby/Lobby';


class StartDialog extends React.Component {
  state = {
    open: true,
    lobbyPlayers: []
  };

  socketConnection = () => {
    var socket = this.props.socket


  }

  handleStart = () => {
    var socket = this.props.socket
    if (this.state.isStarted) {
      
    } else {socket.emit('start'); }
  };
  componentDidMount() {
    var socket = this.props.socket
    var component = this
    this.socketConnection()
    let handlePlay = (status) => {
      this.setState({
        open: status,
      })
      console.log('emesso play:' + status)
    }
    let handleStartClick = (status) => {
      this.setState({
        isStarted: status,
      })
      console.log('emesso play:' + status)
    }
    socket.on('start', function (start) {
      handleStartClick(start.statusStart)
      console.log('qualcuno ha cliccato start: ' + start.statusStart)
    })
    socket.on('play', function (play) {
      handlePlay(play.status)

    })


    socket.on('connect', function (msg = {}) {
      let allPlayer = msg.allPlayers || [];
      component.setState({
        lobbyPlayers: allPlayer
      })
      console.log(component.state.lobbyPlayers)
    })
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Start a game"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want start a game?
            </DialogContentText>
            <Timer
              socket={this.props.socket}
            />
          </DialogContent>
          <Lobby allPlayers={this.state.lobbyPlayers}></Lobby>
          <DialogActions>
            <Button onClick={this.handleStart} color="primary" autoFocus>
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StartDialog;