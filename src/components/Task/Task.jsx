import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../../assets/constants';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.taskDescription,
      taskDatePassed: this.formatTaskDatePassed(this.props.taskDateCreated),
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTaskDatePassed, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTaskDatePassed = (dateCreated) => {
    return formatDistanceToNow(dateCreated, {
      addSuffix: true,
      includeSeconds: true,
    });
  };

  updateTaskDatePassed = () => {
    const { taskDateCreated } = this.props;

    const newTaskDatePassed = this.formatTaskDatePassed(taskDateCreated);

    this.setState({
      taskDatePassed: newTaskDatePassed,
    });
  };

  handleValueChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleTaskClick = () => {
    const { id, taskStatus, taskDescription, onTaskChange } = this.props;

    const newTaskStatus = taskStatus === FILTER_ACTIVE ? FILTER_COMPLETED : FILTER_ALL;
    onTaskChange(id, newTaskStatus, taskDescription);
  };

  handleTaskEdit = (event) => {
    const { id, onTaskChange } = this.props;
    const { inputValue } = this.state;

    event.preventDefault();
    onTaskChange(id, FILTER_ACTIVE, inputValue);
  };

  handleShowEdit = () => {
    const { id, taskStatus, taskDescription, onTaskChange } = this.props;

    if (taskStatus === FILTER_ACTIVE) {
      onTaskChange(id, 'editing', taskDescription);
    }
  };

  render() {
    const { taskStatus, taskDescription, onTaskDelete } = this.props;
    const { inputValue, taskDatePassed } = this.state;

    return (
      <li className={taskStatus}>
        <div className="view">
          <div onClick={this.handleTaskClick}>
            <input className="toggle" type="checkbox" />
            <label>
              <span className="description">{taskDescription}</span>
              <span className="created">{taskDatePassed}</span>{' '}
            </label>
          </div>
          <button className="icon icon-edit" type="button" onClick={this.handleShowEdit} />
          <button className="icon icon-destroy" type="button" onClick={onTaskDelete} />
        </div>
        <form onSubmit={this.handleTaskEdit}>
          <input
            type="text"
            className="edit"
            defaultValue={inputValue}
            onChange={this.handleValueChange}
            required
            pattern="^[^\s]+(\s.*)?$"
            title="Field must not be empty"
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  taskStatus: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  taskDateCreated: PropTypes.number.isRequired,
  onTaskChange: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
};

export { Task };
