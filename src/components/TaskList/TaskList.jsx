import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

function TaskList({ todoItem, onDeleted, onToggleDone, onChangeLabel, onStartTimer, onStopTimer }) {
  return (
    <ul className="todo-list">
      {todoItem.map((item) => (
        <Task
          status={item.status}
          key={item.id}
          label={item.label}
          minutes={item.minutes}
          seconds={item.seconds}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          done={item.done}
          onChangeLabel={(label) => onChangeLabel(item.id, label)}
          created={item.created}
          onStartTimer={() => onStartTimer(item.id)}
          onStopTimer={() => onStopTimer(item.id)}
        />
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  todoItem: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onChangeLabel: () => {},
  onStartTimer: () => {},
  onStopTimer: () => {},
};

TaskList.propTypes = {
  todoItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date),
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
};

export default TaskList;
