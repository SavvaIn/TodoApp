import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer';
import './App.css';
import { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from '../../assets/constants';

export default class App extends Component {
  maxId = 100;

  state = {
    todoItem: [],
    term: '',
    filter: 'all',
    created: new Date(),
  };

  createTodoItem = (label) => ({
    label,
    done: false,
    id: this.maxId++,
    status: '',
    timeStarted: false,
    minutes: '',
    seconds: '',
  });

  addItem = (text, minutes, seconds) => {
    if (
      isNaN(parseInt(minutes, 10)) ||
      isNaN(parseInt(seconds, 10)) ||
      parseInt(minutes, 10) < 0 ||
      parseInt(seconds, 10) < 0 ||
      text.length <= 0
    ) {
      alert('Invalid input. Please enter valid values for minutes and seconds.');
      return;
    }
    const newItem = this.createTodoItem(text);
    newItem.minutes = minutes;
    newItem.seconds = seconds;
    newItem.created = new Date();
    this.setState(({ todoItem }) => {
      const newArr = [...todoItem, newItem];
      return {
        todoItem: newArr,
      };
    });
  };

  deleteItem = (id) => {
    clearInterval(this.state.timerId);
    this.setState(({ todoItem, activeTaskId }) => {
      const taskToDelete = todoItem.find((item) => item.id === id);
      if (taskToDelete) {
        const updatedTodoItem = todoItem.filter((item) => item.id !== id);
        const updatedActiveTaskId = activeTaskId === id ? null : activeTaskId;
        return {
          todoItem: updatedTodoItem,
          activeTaskId: updatedActiveTaskId,
          timerId: null,
        };
      }
      return null;
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((property) => property.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoItem }) => ({
      todoItem: this.toggleProperty(todoItem, id, 'done'),
    }));
  };

  filter = (items, filter) => {
    switch (filter) {
      case FILTER_ALL:
        return items;
      case FILTER_ACTIVE:
        return items.filter((item) => !item.done);
      case FILTER_COMPLETED:
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.indexOf(term) > -1);
  };

  onClearCompleted = () => {
    this.state.todoItem.forEach((item) => {
      if (item.timeStarted && item.done) {
        this.stopTimer(item.id);
      }
    });

    this.setState((prevState) => ({
      todoItem: prevState.todoItem.filter((item) => !item.done),
    }));
  };

  onChangeLabel = (id, newLabel) => {
    this.setState(({ todoItem }) => {
      const index = todoItem.findIndex((task) => task.id === id);
      const updatedItem = { ...todoItem[index], label: newLabel };
      return {
        todoItem: [...todoItem.slice(0, index), updatedItem, ...todoItem.slice(index + 1)],
      };
    });
  };

  startTimer = (id) => {
    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...todoItem];
      updatedTodoItem[idx].timeStarted = true;
      return {
        todoItem: updatedTodoItem,
      };
    });

    const timerId = setInterval(() => {
      this.updateTime(id);
    }, 1000);

    this.setState({ timerId });
  };

  stopTimer = (id) => {
    clearInterval(this.state.timerId);

    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...todoItem];
      updatedTodoItem[idx].timeStarted = false;
      return {
        todoItem: updatedTodoItem,
      };
    });
  };

  updateTime = (id) => {
    this.setState((prevState) => {
      const updatedTodoItem = prevState.todoItem.map((item) => {
        if (item.id === id && item.timeStarted) {
          let minutes = item.minutes;
          let seconds = item.seconds - 1;

          if (seconds < 0) {
            minutes -= 1;
            seconds = 59;
          }

          return {
            ...item,
            minutes,
            seconds,
            timeStarted: minutes !== 0 || seconds !== 0,
          };
        }
        return item;
      });

      return { todoItem: updatedTodoItem };
    });
  };

  render() {
    const { todoItem, filter, term } = this.state;
    const vusableItems = this.filter(this.search(todoItem, term), filter);

    const doneCount = todoItem.filter((el) => el.done).length;
    const todoCount = todoItem.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>

        <section className="main">
          <TaskList
            todoItem={vusableItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onChangeLabel={this.onChangeLabel}
            created={this.created}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
          />
          <Footer
            filter={filter}
            todoCount={todoCount}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
