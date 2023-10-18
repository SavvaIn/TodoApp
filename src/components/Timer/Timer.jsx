import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Timer({ onStartTimer, onStopTimer, minutes, seconds }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const toggleTimer = () => {
    if (!isTimerRunning) {
      onStartTimer();
    } else {
      onStopTimer();
    }

    setIsTimerRunning(!isTimerRunning);
  };

  const parsedMinutes = parseInt(minutes, 10);
  const parsedSeconds = parseInt(seconds, 10);

  return (
    <span className="description">
      <button
        className={`icon ${isTimerRunning ? 'icon-pause' : 'icon-play'}`}
        onClick={toggleTimer}
        type="button"
        aria-label={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
      />
      {`${parsedMinutes}:${parsedSeconds}`}
    </span>
  );
}

Timer.propTypes = {
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

export default Timer;
