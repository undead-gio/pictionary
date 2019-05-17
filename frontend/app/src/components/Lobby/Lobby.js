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
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

class Lobby extends Component {
    render() {
        return (
            <Grid item xs={12} md={6}>
                <Typography variant="h6" className={this.props.classes.title}>
                    Connected users
                </Typography>
                <div className={this.props.classes.demo}>
                    <List dense>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="nome utente"
                                    
                                />
                            </ListItem>,
    
                    </List>
                </div>
            </Grid>
        );
    }
}
        
