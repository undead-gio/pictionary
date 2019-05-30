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
import Chip from '@material-ui/core/Chip';
import UserList from '../UserList/UserList';
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
        position: 'absolute',
        top: '8vh',
        width: '10%',
        fontSize: 'large',
        left: '50%',
        transform: 'translateX(-50%)',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
});

class Header extends Component {
    state = {
        WinWord: 'Wait..',
        username: this.props.username,
        left: false,
        players: [],
        master: '',
        isWait: true,
        isMaster: this.props.isMaster,
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    componentDidMount() {
        var socket = this.props.socket
        var component = this
        socket.on('word', function (word) {
            component.setState({
                WinWord: word.word,
            })
        })
        socket.on('play', function (play) {
            component.setState({
                players: play.players,
                master: play.master,
            })
        })
        socket.on('isMaster', function (data) {
            component.setState({
                isMaster: data.isMaster
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        var socket = this.props.socket
        if (nextProps.username !== this.state.username) {
            this.setState({
                username: nextProps.username
            })
        }
        if (nextProps.gameIsStart) {
            socket.emit('game counter')
        }
    }
    render() {
        const { classes } = this.props;
        let winWord
        if (this.state.isMaster) {
            winWord = <Chip label={this.state.WinWord} className={classes.chip} color="primary" />
        } else { }
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
                        {winWord}
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
                        <UserList players={this.state.players} master={this.state.master} />
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