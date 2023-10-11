import React from 'react';
import PropTypes from 'prop-types';

function Timer({ onStartTimer, onStopTimer, seconds, minutes }) {
  const displayMinutes = String(minutes).padStart(2, '0');
  const displaySeconds = String(seconds).padStart(2, '0');

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onStartTimer} type="button" aria-label="Start Timer" />
      <button className="icon icon-pause" onClick={onStopTimer} type="button" aria-label="Stop Timer" />
      {displayMinutes}:{displaySeconds}
    </span>
  );
}

Timer.propTypes = {
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
};
export default Timer;
