import React, { Component } from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';

//style for classNames
const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  textBar:{
    width: '100%',
  },
  anchorOriginBottomLeft:{
    margin:'20px'
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class MsgReceiver extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      open: false,
      message: 'Ready!',
    };
    
  }
  //receive and show message from socket
  socketConnection = () => {
    var socket=this.props.socket
    let receiveMsg = (_msg,type) =>{
      this.props.enqueueSnackbar(_msg,{ 
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        variant: type,
        autoHideDuration: 1500,
    });
    }
    socket.on('chat message', function (msg) {
      receiveMsg((msg.username+' / '+msg.msg),msg.type)
    })
  }
  //send message to socket
  handleClick = () => {
    var socket=this.props.socket
    socket.emit('chat message', this.state.message)
  }
  //save text input in the state
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount(){
    this.socketConnection()
  }
  render() {
    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={this.props.classes.appBar}>
          <Toolbar >
            <TextField
            id="outlined-full-width"
            label="Guess the draw"
            style={{ margin: 8 }}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('message')}
            className={this.props.classes.textBar}
            InputLabelProps={{
              shrink: true,
            }}
            />
            <div>
              <Fab size="medium" color="secondary" aria-label="Add" onClick={this.handleClick}>
                <SendIcon />
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}
MsgReceiver.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};
const Messages = withStyles(styles)(withSnackbar(MsgReceiver));
function Chat({ socket }) {
  return (
    <SnackbarProvider 
    maxSnack={5}
    dense
    hideIconVariant
    >
      <Messages socket={socket}/>
    </SnackbarProvider>
  );
}
export default  withStyles(styles)(Chat);
