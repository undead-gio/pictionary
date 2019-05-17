import React, { Component } from 'react';
import SnackWord from './SnackWord'
import { SnackbarProvider, withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//style for classNames
const styles = theme => ({

});

class WordReceiver extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      open: false,
    };

  }
  //receive and show message from socket
  socketConnection = () => {
    var socket = this.props.socket
    //sostituire msg con la parola da disegnare
    let receiveMsg = (_msg) => {
      this.props.enqueueSnackbar(_msg, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
          
        },
        persist: true,
        children: (key) => (
          //da personalizzare il componente SnackWord
          <SnackWord id={key} word={_msg} />
        ),
      });
    }
    socket.on('chat message', function (msg) {
      receiveMsg((msg.username))
    })
  }
  componentDidMount() {
    this.socketConnection()
  }
  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}
WordReceiver.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};
const WinWord = withStyles(styles)(withSnackbar(WordReceiver));
function Word({ socket }) {
  return (
    <SnackbarProvider
      maxSnack={1}
      dense
      hideIconVariant
    >
      <WinWord socket={socket} />
    </SnackbarProvider>
  );
}
export default withStyles(styles)(Word);
