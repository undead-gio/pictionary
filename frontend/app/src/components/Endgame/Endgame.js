import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { func } from 'prop-types';

class Endgame extends React.Component {
  state = {
    open: false,
    winner: '',
    master:'',
    winWord:'',
  };
  handleClose = () => {
    window.location.reload();
  };
  componentDidMount() {
    var socket = this.props.socket
    var component = this
    socket.on('connection', function (data) {
        component.setState({
          open: false,
        })
    })
    socket.on('end', function (data) {
        component.setState({
          open: data.finish,
          winner: data.winner,
          master: data.master,
          winWord:data.winWord
        })
    })
  }
  render() {
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Game Over
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
                Congratulations to "{this.state.master}" who drew the word "{this.state.winWord}" and congratulations to "{this.state.winner}" who guessed it.
            </Typography>
            <CardMedia
          component="img"
          alt="Trophy"
          image="https://media1.tenor.com/images/3d357d9c8cd850ab98fe6643aa411f70/tenor.gif?itemid=13253833"
          title="Trophy"
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Restart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Endgame;