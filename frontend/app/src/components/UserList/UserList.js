import React, { Component } from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';



class User_list extends React.Component {

    state = {
        users: []
    }

    componentDidMount = (props) => {
        let component = this;
        this.setState({ users: props.allUser })
        let socket = props.socket;
        socket.on('new user', (msg) => {
            component.addUser(msg.username);
        });
    }

    addUser = (username) => {
        this.setState()
    }

    removeUser = (username) => {
        this.setState()
    }

    render() {

        let masters = this.state.users.filter((user) => user.role === 'master'),
            players = this.state.users.filter((user) => user.role !== 'master');

        return (
            <div >
                <List>
                    {
                        // operatore ternario
                        // condizione ? se vera : se falsa
                        // condizione ? se vera : condizione === condizione && se vera
                        // condizione ? condizione : se falsa === condizione || se falsa
                        masters.length
                        &&
                        <React.Fragment>
                            <ListItem button >
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={masters[0].name} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    }
                    {
                        players.map((user) => {
                            return (
                                <ListItem button >
                                    <ListItemIcon><MailIcon /></ListItemIcon>
                                    <ListItemText primary={user.name} />
                                </ListItem>
                            );
                        })
                    }
                </List>
            </div>
        );
    }
}

export default User_list;

// Usage
// import User_list from './UserList'
// <User_list allUser={["pippo","pluto"]} />
