import React, { Component } from 'react';
import Task from './Task';

class TaskList extends Component {
    state = {
        sort: {
            name: null,
            deadline: null,
            importance: null,
        },
    }

    sortByName = () => {
        this.setState({
            sort: {
                name: !this.state.sort.name,
                deadline: null,
                importance: null,
            },
        })
    }

    sortByDeadline = () => {
        this.setState({
            sort: {
                name: null,
                deadline: !this.state.sort.deadline,
                importance: null,
            },
        })
    }

    sortByImportance = () => {
        this.setState({
            sort: {
                name: null,
                deadline: null,
                importance: !this.state.sort.importance,
            },
        })
    }

    render() {
        const { name, deadline, importance } = this.state.sort;
        const { tasks, removeTask, doneTask, undoTask } = this.props;
        const active = tasks.filter(task => task.active);
        const done = tasks.filter(task => !task.active);
        if (name) {
            active.sort((a, b) => {
                a = a.text.toLowerCase();
                b = b.text.toLowerCase();
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            })
        }
        if (name === false) {
            active.sort((a, b) => {
                a = a.text.toLowerCase();
                b = b.text.toLowerCase();
                if (a < b) return 1;
                if (a > b) return -1;
                return 0;
            })
        }

        if (deadline) {
            active.sort((a, b) => a.deadline - b.deadline)
        }
        if (deadline === false) {
            active.sort((a, b) => b.deadline - a.deadline)
        }

        if (importance) {
            active.sort((a, b) => {
                a = a.importance.toLowerCase();
                b = b.importance.toLowerCase();
                if (a < b) return 1;
                if (a > b) return -1;
                return 0;
            })
        }
        if (importance === false) {
            active.sort((a, b) => {
                a = a.importance.toLowerCase();
                b = b.importance.toLowerCase();
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            })
        }

        done.sort((a, b) => b.doneDate - a.doneDate)

        const activeTasks = active.map(task => (
            <Task key={task.id} task={task} removeTask={removeTask} doneTask={doneTask} />))
        const doneTasks = done.map(task => (
            <Task key={task.id} task={task} removeTask={removeTask} undoTask={undoTask} />
        ))
        const noTaskTxt = doneTasks.length === 0 ? "No Tasks" : "All Done";

        const buttonIcon = type => {
            if (type === null) {
                return <i className="fas fa-sort"></i>
            } else if ((type === true && type !== importance) || (type === false && type === importance)) {
                return <i className="fas fa-sort-up"></i>
            } else if ((type === false && type !== importance) || (type === true && type === importance)) {
                return <i className="fas fa-sort-down"></i>
            }
        }

        return (
            <div className="task-list" >
                <h4 className="list-title">To Do [{activeTasks.length}]</h4>
                <div className="sort">
                    <button onClick={this.sortByName}>Name {buttonIcon(name)}</button>
                    <button onClick={this.sortByDeadline}>Deadline {buttonIcon(deadline)}</button>
                    <button onClick={this.sortByImportance}>Importance {buttonIcon(importance)}</button>
                </div>
                {activeTasks.length === 0 ? <div className="no-task">{noTaskTxt} <i className="far fa-smile"></i></div> : <div>{activeTasks}</div>}
                <div>
                    {doneTasks.length === 0 ? null : <><h4 className="list-title">Done [{doneTasks.length}]</h4> <div>{doneTasks}</div></>}
                </div>
            </div >)
    }
}

export default TaskList;