import React, { Component } from 'react';
import Timer from '../Timer/Timer'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Chip from '@material-ui/core/Chip';
import { ListItemSecondaryAction } from '@material-ui/core';
import User_list from '../UserList/UserList';
const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    usr: {
        position: 'absolute',
        marginRight: '50%!important',
        transform: 'translateX(50%)',
        right: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing.unit,
            width: 'auto',
        },
    },
    timer: {

    },
    subHeader: {
        backgroundColor: theme.palette.secondary.main,
    },
    chip: {
        marginRight: theme.spacing.unit,
    }
});

class Header extends Component {
    state = {
        WinWord: 'Wait..',
        username: '',
        left: false,
        players: [],
        master: '',
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    socketConnection = () => {
        
        //sostituire msg con la parola da disegnare
        let receiveUsername = (_usr) => {
            this.setState({
                username: _usr,
            })
        }
    }
    componentDidMount() {
        this.socketConnection()
        var socket = this.props.socket
        let receiveWinWord = (_word) => {
            this.setState({
                WinWord: _word,
            })
        }
        let receiveAllPlayers = (_players, _master) => {
            this.setState({
                players: _players,
                master: _master,
            })
        }
        socket.on('word', function (word) {
            receiveWinWord(word.word)
        })
        socket.on('play', function (play) {
            receiveAllPlayers(play.player,play.master)
        })
    }
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
                    <Toolbar variant="dense">
                        <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            Soctionary
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.usr}>
                            {this.state.username}
                        </Typography>
                    </Toolbar>
                    <Toolbar variant="dense" className={classes.subHeader} >
                        <Chip
                            label={this.state.WinWord}
                            className={classes.chip}
                            color="primary"
                        />
                        <Timer
                            socket={this.props.socket}
                            user={1}
                        />
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        <User_list players={ this.state.players} master={ this.state.master} />
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