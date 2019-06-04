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
import './Endgame.scss'

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
          <DialogContent dividers>
          <div className="header-card">
            <Typography variant="h5" gutterBottom>
              Winner Word: "{this.state.winWord}".
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Congratulations to {this.state.winner} for having guessed the awesome drawing by {this.state.master}.
            </Typography>
          </div>
            <CardMedia
              component="img"
              alt="Trophy"
              image="https://media.giphy.com/media/9xt1MUZqkneFiWrAAD/giphy.gif"
              title="Trophy"
              className="wingif"
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="text" color="primary" fullWidth={true}>
              Restart
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Endgame;