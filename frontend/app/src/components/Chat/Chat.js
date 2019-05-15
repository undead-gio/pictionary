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
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  textBar:{
    width: '100%',
  },
  close: {
    padding: theme.spacing.unit / 2,
  }
});

class MsgReceiver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleClick = () => {
    this.props.enqueueSnackbar('Message');
  };
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
function Chat() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Messages />
    </SnackbarProvider>
  );
}
export default  Chat;
