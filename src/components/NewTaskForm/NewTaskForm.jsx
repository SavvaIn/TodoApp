import { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  createNewTask = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    const { onAddNewTask } = this.props;

    onAddNewTask(inputValue);

    this.setState({
      inputValue: '',
    });
  };

  handleValueChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form onSubmit={this.createNewTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleValueChange}
          required
          pattern="^[^\s]+(\s.*)?$"
          title="Field must not be empty"
          value={inputValue}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAddNewTask: PropTypes.func.isRequired,
};
