import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BrushIcon from '@material-ui/icons/Brush';
import PersonIcon from '@material-ui/icons/Person';

class UserList extends React.Component {

    render() {

        //let masters = this.state.users.filter((user) => user.role === 'master'),
        //    players = this.state.users.filter((user) => user.role !== 'master');

        console.log(this.props.master, this.props.players);

        return (
            <div>
                <List>
                    {
                        // operatore ternario
                        // condizione ? se vera : se falsa
                        // condizione ? se vera : condizione === condizione && se vera
                        // condizione ? condizione : se falsa === condizione || se falsa
                        !!this.props.master
                        &&
                        <React.Fragment>
                            <ListItem button >
                                <ListItemIcon><BrushIcon /></ListItemIcon>
                                <ListItemText primary={this.props.master} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    }
                    {
                        this.props.players.map((player) => {
                            return (
                                <ListItem button >
                                    <ListItemIcon><PersonIcon /></ListItemIcon>
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

export default UserList;

// Usage
// import User_list from './UserList'
// <User_list allUser={["pippo","pluto"]} />
