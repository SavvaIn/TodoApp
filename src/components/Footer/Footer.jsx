import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Footer.css';

import { TasksFilter } from '../TasksFilter/TasksFilter';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../../assets/constants';

function Footer({ currentFilter, tasksLeft, onClearCompleted, onFilterChange }) {
  const filterOptions = [
    { name: FILTER_ALL, label: 'All' },
    { name: FILTER_ACTIVE, label: 'Active' },
    { name: FILTER_COMPLETED, label: 'Completed' },
  ];

  const filterElements = filterOptions.map(({ name, label }) => {
    const isActive = name === currentFilter;

    const filterClass = classNames({
      selected: isActive,
    });

    return (
      <TasksFilter
        key={name}
        className={filterClass}
        name={label}
        onFilterChange={() => {
          onFilterChange(name);
        }}
      />
    );
  });

  return (
    <>
      <span className="todo-count">{tasksLeft} items left</span>
      <ul className="filters">{filterElements}</ul>
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </>
  );
}

Footer.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  tasksLeft: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export { Footer };
