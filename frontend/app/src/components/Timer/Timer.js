import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


const styles = {
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'relative',
        top: '0px',
        zIndex: '3',
        padding: '10px 0px',
    },
};

class Timer extends React.Component {
    state = {
        completed: 100,
        text: 'Hurry Up!',
    };
    componentDidMount() {
        var socket = this.props.socket
        var component = this
        socket.on('counterGame', function (time) {
            component.setState({
                completed: (time.counterGame)
            })
        })
    }
    componentWillUnmount(){

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="subheading" color="inherit">
                    {this.state.text}
                </Typography>
                <LinearProgress color="primary" variant="determinate" value={this.state.completed} />
            </div>
        );
    }
}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);