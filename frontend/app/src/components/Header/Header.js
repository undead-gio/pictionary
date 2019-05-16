import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    list: {
        width: 250,
    }
  });

class Header extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
      };
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
  render() {
    const { classes } = this.props;
    //dentro sidelist come ListItema possiamo inserire quasi tutto quello che vogliamo
    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem button >
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary='Inbox' />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button >
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary='Mail' />
            </ListItem>
        </List>
      </div>
    );
    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Soctionary
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >
                    {sideList}
                </div>
            </Drawer>
        </React.Fragment>
    );
  }
}
Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Header);