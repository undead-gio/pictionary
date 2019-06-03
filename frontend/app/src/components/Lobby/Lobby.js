import React, { Component } from 'react';
import server from 'socket.io-client';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { FormHelperText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import './Lobby.scss'


//style for classNames
const styles = theme => ({
    lobbyRoot: {
        display: 'flex',
        height: window.innerHeight,
    },
    userList: {
        width: 100,
        zIndex: '10',
        margin: 'auto',
    },
});

class Lobby extends Component {
    render() {
        return (
            <Grid item xs={12} md={12} className={this.props.classes.lobbyRoot}>
            <div className={this.props.classes.userList}>
                <Typography variant="h6">
                    Users [{this.props.usersCount}]
                </Typography>
                    <List>
                        {
                            this.props.allPlayers.map(function(player) {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={player}
                                        />
                                        <Divider />
                                    </ListItem>
                                    
                                )
                            })
                        }                        
                    </List>
            </div>
            </Grid>
        );
    }
}

export default withStyles(styles) (Lobby);
        
