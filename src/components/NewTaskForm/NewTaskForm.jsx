import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ addItem }) {
  const [formData, setFormData] = useState({
    label: '',
    minutes: '',
    seconds: '',
  });

  const { label, minutes, seconds } = formData;

  const onLabelChange = (e) => {
    setFormData({ ...formData, label: e.target.value });
  };

  const onMinutesChange = (e) => {
    setFormData({
      ...formData,
      minutes: e.target.value,
    });
  };

  const onSecondsChange = (e) => {
    setFormData({
      ...formData,
      seconds: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Number.isNaN(minutes) || Number.isNaN(seconds) || minutes < 0 || seconds < 0 || label.length <= 0) {
      alert('Field must not be empty');
    } else {
      addItem(label, minutes, seconds);
    }

    setFormData({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        name="description"
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        name="minutes"
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        name="seconds"
        value={seconds}
        onChange={onSecondsChange}
      />
      <input type="submit" className="new-todo-form__submit" />
    </form>
  );
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
};
