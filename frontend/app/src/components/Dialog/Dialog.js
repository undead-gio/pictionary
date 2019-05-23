import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class StartDialog extends React.Component {
    state = {
        open: true,
    };
    socketConnection = () => {
        var socket = this.props.socket
        //socket.on('timer', function (time,text) { })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        var socket = this.props.socket
        socket.emit('start', { isStarted: true});
        this.setState({ open: false });
    };
    componentDidMount() {
        this.socketConnection()
    }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Start a game"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Blablabla Blablabla Blablabla
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Start
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StartDialog;