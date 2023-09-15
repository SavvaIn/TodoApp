import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

const filterOptions = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

function Footer({ currentFilter, tasksLeft, onClearCompleted, onFilterChange }) {
  const filterElements = filterOptions.map(({ name, label }) => {
    const isActive = name === currentFilter;
    const className = isActive ? 'selected' : '';

    return (
      <TasksFilter
        key={name}
        className={className}
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
  filterStatus: PropTypes.string.isRequired,
  tasksLeft: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Footer;
