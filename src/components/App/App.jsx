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
    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const newArray = [...todoItem.slice(0, idx), ...todoItem.slice(idx + 1)];
      return {
        todoItem: newArray,
      };
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
    this.setState(({ todoItem }) => {
      const updateTodoItem = todoItem.filter((item) => !item.done);
      return {
        todoItem: updateTodoItem,
      };
    });
  };

  // editItem = (id, editedLabel) => {
  //   this.setState(({ todoItem }) => {
  //     const idx = todoItem.findIndex((task) => task.id === id);
  //     const updatedTodoItem = [...todoItem];
  //     updatedTodoItem[idx].label = editedLabel;
  //     return {
  //       todoItem: updatedTodoItem,
  //     };
  //   });
  // };

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
    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...todoItem];
      const item = updatedTodoItem[idx];

      if (item.timeStarted) {
        if (item.seconds > 0) {
          item.seconds -= 1;
        } else if (item.minutes > 0) {
          item.minutes -= 1;
          item.seconds = 59;
        }

        if (item.minutes === 0 && item.seconds === 0) {
          item.timeStarted = false;
        }
      }

      return {
        todoItem: updatedTodoItem,
      };
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
