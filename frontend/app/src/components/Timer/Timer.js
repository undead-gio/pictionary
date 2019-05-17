import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
        width: '100%',
        position: 'relative',
        top: '0px',
        zIndex: '3',
    },
};

class Timer extends React.Component {
    state = {
        completed: 50,
    };
    socketConnection = () => {
        var socket = this.props.socket
        let updateTimer = (time) => {
            this.setState({
                completed: time,
            })
        }
        socket.on('timer', function (time) {
            updateTimer(time)
        })
    }

    componentDidMount() {
        this.socketConnection()
    }

    componentWillUnmount() {

    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <span>Hurry Up!</span>
                <LinearProgress color="primary" variant="determinate" value={this.state.completed} />
            </div>
        );
    }
}

Timer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Timer);