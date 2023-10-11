import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from '../../assets/constants';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  };

  static PropsTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
  };

  buttons = [
    { name: FILTER_ALL, label: 'All' },
    { name: FILTER_ACTIVE, label: 'Active' },
    { name: FILTER_COMPLETED, label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const activeClass = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button type="button" className={activeClass} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}
