import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  render() {
    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Soctionary
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
  }
}

export default Header;