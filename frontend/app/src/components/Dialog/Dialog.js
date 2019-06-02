import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lobby from '../Lobby/Lobby';
import { TextField } from '@material-ui/core';


class StartDialog extends React.Component {
  state = {
    open: true,
    lobbyPlayers: [],
    username: '',
  };
  handleStart = () => {
    var socket = this.props.socket
    console.log(this.state.username)
    this.props.action(this.state.username)
    socket.emit('start', { username: this.state.username })
  };
  componentDidMount() {
    var socket = this.props.socket
    var component = this
    let handlePlay = (status) => {
      this.setState({
        open: status,
      })
    }
    let handleStartClick = (status) => {
      this.setState({
        isStarted: status,
      })
    }
    socket.on('start', function (start) {
      handleStartClick(start.statusStart)
    })
    socket.on('play', function (play) {
      handlePlay(play.status)

    })
    socket.on('on', function (msg = {}) {
      let allPlayer = msg.allPlayers || [];
      component.setState({
        lobbyPlayers: allPlayer
      })
      console.log(component.state.lobbyPlayers)
    })
  }
  handleChange = event => {
    this.setState({
      username: event.target.value,
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
          <DialogTitle id="alert-dialog-title">{"Welcome to Soctionary"}</DialogTitle>
          <DialogContent>
            <TextField
              label="Choose a gametag"
              inputProps={{
                'aria-label': 'username',
              }}
              value={this.state.username}
              onChange={this.handleChange}
            />
          </DialogContent>
          <Lobby allPlayers={this.state.lobbyPlayers}></Lobby>
          <DialogActions>
            {/*<Timer
            socket={this.props.socket}
          />*/}
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