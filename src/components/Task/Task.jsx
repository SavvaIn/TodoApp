import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../Timer';

export default function Task(props) {
  const { label, onDeleted, onToggleDone, done, onChangeLabel, created, onStartTimer, onStopTimer, minutes, seconds } =
    props;

  const [edited, setEdited] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [createdFormat, setCreatedFormat] = useState(formatDistanceToNow(created, { includeSeconds: true }));
  const updateTimer = () => {
    setCreatedFormat(formatDistanceToNow(created, { includeSeconds: true }));
  };
  useEffect(() => {
    const timerID = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [created]);

  const changeLabel = (input) => {
    if (input.key === 'Enter') {
      onChangeLabel(input.target.value);
      setEdited(false);
    }
  };

  const enableEdit = () => {
    setEdited(true);
  };

  return (
    <li className={` ${done ? 'completed' : ''} ${edited ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" checked={done} type="checkbox" onChange={onToggleDone} />
        <label>
          <span className="title">{label}</span>
          <Timer onStartTimer={onStartTimer} onStopTimer={onStopTimer} minutes={minutes} seconds={seconds} />
          <span className="description">{`created ${createdFormat} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={enableEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input
        type="text"
        className="edit"
        value={newLabel}
        onInput={(e) => {
          setNewLabel(e.target.value);
        }}
        onKeyDown={changeLabel}
      />
    </li>
  );
}

Task.defaultProps = {
  label: 'Default Label',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  onChangeLabel: () => {},
  created: new Date(),
  onStartTimer: () => {},
  onStopTimer: () => {},
  minutes: 'Default minutes',
  seconds: 'Default seconds',
};

Task.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  onChangeLabel: PropTypes.func,
  created: PropTypes.instanceOf(Date),
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
};
