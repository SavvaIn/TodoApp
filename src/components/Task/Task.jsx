import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../Timer';

export default class Task extends Component {
  static defaultProps = {
    label: 'Default Label',
    onDeleted: () => {},
    onToggleDone: () => {},
    done: false,
    onChangeLabel: () => {},
    created: new Date(),
    onStartTimer: () => {},
    onStopTimer: () => {},
    minutes: 'Default minutes',
    seconds: 'Default seconds',
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool,
    onChangeLabel: PropTypes.func,
    created: PropTypes.instanceOf(Date),
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
  };

  state = {
    edited: false,
    newLabel: this.props.label,
    createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }),
  };

  componentDidMount() {
    this.timerID = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTimer = () => {
    this.setState({
      createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }),
    });
  };

  changeLabel = (input) => {
    if (input.key === 'Enter') {
      this.props.onChangeLabel(input.target.value);
      this.setState({ edited: false });
    }
  };

  enableEdit = () => {
    this.setState({ edited: true });
  };

  CheckboxChange = () => {
    this.props.onToggleDone();
  };

  render() {
    const { label, onDeleted, done, onStartTimer, onStopTimer, minutes, seconds } = this.props;
    const { edited, newLabel, createdFormat } = this.state;
    let classNames = '';
    classNames += done ? ' completed' : '';
    classNames += edited ? ' editing' : '';
    return (
      <li className={`${classNames}`}>
        <div className="view">
          <input className="toggle" checked={done} type="checkbox" onChange={this.CheckboxChange} />
          <label>
            <span className="title">{label}</span>
            <Timer onStartTimer={onStartTimer} onStopTimer={onStopTimer} minutes={minutes} seconds={seconds} />
            <span className="description">{`created ${createdFormat} ago`}</span>
          </label>

          <button className="icon icon-edit" type="button" onClick={this.enableEdit} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          value={newLabel}
          onInput={(e) => {
            this.setState({ newLabel: e.target.value });
          }}
          onKeyDown={this.changeLabel}
        />
      </li>
    );
  }
}
