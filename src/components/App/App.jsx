import { Component } from 'react';
import { nanoid } from 'nanoid';

import './App.css';

import { NewTaskForm } from '../NewTaskForm/NewTaskForm';
import { TaskList } from '../TaskList/TaskList';
import { Footer } from '../Footer/Footer';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../../assets/constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksData: [],
      filterStatus: FILTER_ALL,
    };
  }

  deleteTask = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((task) => task.id === id);

      const updatedTasksData = [...tasksData.slice(0, idx), ...tasksData.slice(idx + 1)];

      return {
        tasksData: updatedTasksData,
      };
    });
  };

  addNewTask = (value) => {
    this.setState(({ tasksData }) => {
      const newTask = {
        id: nanoid(),
        taskDescription: value,
        taskStatus: FILTER_ACTIVE,
        taskDateCreated: new Date().getTime(),
      };

      const updatedTasksData = [...tasksData, newTask];

      return {
        tasksData: updatedTasksData,
      };
    });
  };

  changeTask = (id, taskStatus, taskDescription) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((task) => task.id === id);
      const updatedTasksData = [...tasksData];
      updatedTasksData[idx].taskStatus = taskStatus;
      updatedTasksData[idx].taskDescription = taskDescription;

      return {
        tasksData: updatedTasksData,
      };
    });
  };

  clearCompletedTasks = () => {
    this.setState(({ tasksData }) => {
      const updatedTasksData = tasksData.filter((tasks) => tasks.taskStatus !== FILTER_COMPLETED);

      return {
        tasksData: updatedTasksData,
      };
    });
  };

  changeFilter = (newFilterStatus) => {
    this.setState({
      filterStatus: newFilterStatus,
    });
  };

  getFilteredTasks = () => {
    const { tasksData, filterStatus } = this.state;
    if (filterStatus === FILTER_ACTIVE) {
      return tasksData.filter((tasks) => tasks.taskStatus === FILTER_ACTIVE);
    }
    if (filterStatus === FILTER_COMPLETED) {
      return tasksData.filter((tasks) => tasks.taskStatus === FILTER_COMPLETED);
    }
    return tasksData;
  };

  render() {
    const { tasksData, filterStatus } = this.state;

    const tasksLeft = tasksData.filter((task) => task.taskStatus !== FILTER_COMPLETED).length;

    const filteredTasks = this.getFilteredTasks();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddNewTask={this.addNewTask} />
        </header>
        <section className="main">
          <TaskList tasksData={filteredTasks} onTaskDelete={this.deleteTask} onTaskChange={this.changeTask} />
        </section>
        <footer className="footer">
          <Footer
            filterStatus={filterStatus}
            tasksLeft={tasksLeft}
            onClearCompleted={this.clearCompletedTasks}
            onFilterChange={this.changeFilter}
          />
        </footer>
      </section>
    );
  }
}
