import React from 'react';
import PropTypes from 'prop-types';

import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from '../../assets/constants';

function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: FILTER_ALL, label: 'All' },
    { name: FILTER_ACTIVE, label: 'Active' },
    { name: FILTER_COMPLETED, label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const activeClass = isActive ? 'selected' : '';
        return (
          <li key={name}>
            <button type="button" className={activeClass} onClick={() => onFilterChange(name)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: FILTER_ALL,
  onFilterChange: () => {},
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

export default TasksFilter;
