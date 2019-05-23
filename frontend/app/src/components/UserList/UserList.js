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

    render() {

        //let masters = this.state.users.filter((user) => user.role === 'master'),
        //    players = this.state.users.filter((user) => user.role !== 'master');

        //console.log(masters, players);

        return (
            <div>
                <List>
                    {
                        // operatore ternario
                        // condizione ? se vera : se falsa
                        // condizione ? se vera : condizione === condizione && se vera
                        // condizione ? condizione : se falsa === condizione || se falsa
                        !!master
                        &&
                        <React.Fragment>
                            <ListItem button >
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={master} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    }
                    {
                        this.props.players.map((player) => {
                            return (
                                <ListItem button >
                                    <ListItemIcon><MailIcon /></ListItemIcon>
                                    <ListItemText primary={player} />
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
