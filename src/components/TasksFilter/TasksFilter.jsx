import PropTypes from 'prop-types';

import './TasksFilter.css';

function TasksFilter({ className, name, onFilterChange }) {
  const handleFilterChange = () => {
    onFilterChange();
  };

  return (
    <li className="filter">
      <button className={className} type="button" onClick={handleFilterChange}>
        {name}
      </button>
    </li>
  );
}

TasksFilter.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
