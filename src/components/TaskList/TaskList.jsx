import PropTypes from 'prop-types';

import './TaskList.css';
import { Task } from '../Task/Task';

function TaskList({ tasksData, onTaskDelete, onTaskChange }) {
  const taskElements = tasksData.map((tasks) => {
    const { id, taskDescription, taskStatus, taskDateCreated } = tasks;

    return (
      <Task
        key={id}
        id={id}
        taskDescription={taskDescription}
        taskStatus={taskStatus}
        taskDateCreated={taskDateCreated}
        onTaskDelete={() => {
          onTaskDelete(id);
        }}
        onTaskChange={onTaskChange}
      />
    );
  });

  return <ul className="todo-list">{taskElements}</ul>;
}

TaskList.propTypes = {
  tasksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      taskDescription: PropTypes.string,
      taskStatus: PropTypes.string,
      taskDateCreated: PropTypes.number,
    })
  ).isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskChange: PropTypes.func.isRequired,
};

export { TaskList };
