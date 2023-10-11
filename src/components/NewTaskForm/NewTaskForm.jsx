import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (min) => {
    this.setState({
      minutes: min.target.value,
    });
  };

  onSecondsChange = (sec) => {
    this.setState({
      seconds: sec.target.value,
    });
  };

  onSubmit = (e) => {
    const { addItem } = this.props;
    const { label, minutes, seconds } = this.state;
    e.preventDefault();
    if (Number.isNaN(minutes) || Number.isNaN(seconds) || minutes < 0 || seconds < 0 || label.length <= 0) {
      alert('Field must not be empty');
    } else {
      addItem(label, minutes, seconds);
    }

    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name="description"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          value={this.state.minutes}
          onChange={this.onMinutesChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          value={this.state.seconds}
          onChange={this.onSecondsChange}
        />
        <input type="submit" className="new-todo-form__submit" />
      </form>
    );
  }
}
