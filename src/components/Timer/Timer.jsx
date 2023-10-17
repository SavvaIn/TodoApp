import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  static propTypes = {
    onStartTimer: PropTypes.func.isRequired,
    onStopTimer: PropTypes.func.isRequired,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  };

  state = {
    isTimerRunning: false,
  };

  toggleTimer = () => {
    const { isTimerRunning } = this.state;
    const { onStartTimer, onStopTimer } = this.props;

    if (!isTimerRunning) {
      onStartTimer();
    } else {
      onStopTimer();
    }

    this.setState((prevState) => ({
      isTimerRunning: !prevState.isTimerRunning,
    }));
  };

  render() {
    const { isTimerRunning } = this.state;
    const { minutes, seconds } = this.props;

    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    return (
      <span className="description">
        <button
          className={`icon ${isTimerRunning ? 'icon-pause' : 'icon-play'}`}
          onClick={this.toggleTimer}
          type="button"
          aria-label={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
        />
        {`${parsedMinutes}:${parsedSeconds}`}
      </span>
    );
  }
}

export default Timer;
