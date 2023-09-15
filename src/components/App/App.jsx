import { Component } from 'react';
import { nanoid } from 'nanoid';

import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksData: [],
      filterStatus: 'all',
    };
  }

  deleteTask = (id) => {
    this.setState(({ tasksData }) => {
      const idx = tasksData.findIndex((item) => item.id === id);

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
        taskStatus: 'active',
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
      const idx = tasksData.findIndex((item) => item.id === id);
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
      const updatedTasksData = tasksData.filter((item) => item.taskStatus !== 'completed');

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
    if (filterStatus === 'active') {
      return tasksData.filter((item) => item.taskStatus === 'active');
    }
    if (filterStatus === 'completed') {
      return tasksData.filter((item) => item.taskStatus === 'completed');
    }
    return tasksData;
  };

  render() {
    const { tasksData, filterStatus } = this.state;

    const tasksLeft = tasksData.filter((item) => item.taskStatus !== 'completed').length;

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
