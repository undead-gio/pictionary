import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Chat extends Component {
  render() {
    return (
      //da spostare la barra nel footer
      <div className="Chat">
      
        <AppBar position="fixed" color="primary" >
          <Toolbar >
            <TextField
            id="outlined-full-width"
            label="Guess the draw"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            />
            <div>
              <Fab size="medium" color="secondary" aria-label="Add">
                <SendIcon />
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
        

      </div>
    );
  }
}

export default Chat;
