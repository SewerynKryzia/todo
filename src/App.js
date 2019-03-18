import React, { Component } from 'react';
import './App.sass';
import TaskList from './TaskList';
import AddTask from './AddTask';

class App extends Component {
  counter = 3;
  state = {
    tasks: [
      {
        id: 0,
        text: "Remove this task",
        importance: 'importance1',
        active: true,
        deadline: 1609372800000,
        doneDate: null,
      },
      {
        id: 1,
        text: 'Add a new task',
        importance: 'importance3',
        active: true,
        deadline: 1577750400000,
        doneDate: null,
      },
      {
        id: 2,
        text: "Make a To-Do List",
        importance: 'importance3',
        active: false,
        deadline: 1552999308088,
        doneDate: 1552563880562,
      },
    ],
  }

  addTask = (text, importance, deadline) => {
    const prevTasks = [...this.state.tasks];
    const newTask = {
      id: this.counter++,
      active: true,
      doneDate: null,
      text,
      importance,
      deadline: Date.parse(deadline),

    }
    const tasks = [...prevTasks, newTask];
    this.setState({
      tasks,
    })
    return true;
  }

  removeTask = id => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    this.setState({
      tasks,
    })
  }

  doneTask = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = false;
        task.doneDate = new Date().getTime();
      }
    })
    this.setState({
      tasks,
    })
  }

  undoTask = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = true;
        task.doneDate = "";
      }
    })
    this.setState({
      tasks,
    })
  }
  render() {
    return (
      <div className="todo-app">
        <h1>To-Do List</h1>
        <AddTask addTask={this.addTask} />
        <TaskList tasks={this.state.tasks} removeTask={this.removeTask} doneTask={this.doneTask} undoTask={this.undoTask} />
      </div>
    );
  }
}

export default App;