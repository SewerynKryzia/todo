import React, { Component } from 'react';

class AddTask extends Component {
    today = new Date().toISOString().slice(0, 10);
    state = {
        value: '',
        importance: "importance1",
        deadline: this.today,
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({
            value,
        })
    }

    handleImportance = e => {
        const importance = e.target.value;
        this.setState({
            importance,
        })
    }

    handleDeadline = e => {
        const deadline = e.target.value;
        this.setState({
            deadline,
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.value) {
            const addTask = this.props.addTask(this.state.value, this.state.importance, this.state.deadline)
            if (addTask) {
                this.setState({
                    value: '',
                    importance: "importance1",
                    deadline: this.today,
                })
            }
        }
    }

    render() {
        const { value, importance, deadline } = this.state
        return (
            <form className="add-task" onSubmit={this.handleSubmit}>
                <input className="input-task-name" type="text" value={value} onChange={this.handleChange} placeholder="Task Name" /><br />
                <div className="importance">
                    <span className="importance-title">Importance</span>
                    <label className="container">Normal
                    <input type="radio" name="importance" value="importance1" checked={importance === "importance1"} onChange={this.handleImportance} />
                        <span className="checkmark normal"></span>
                    </label>
                    <label className="container">High
                    <input type="radio" name="importance" value="importance2" checked={importance === "importance2"} onChange={this.handleImportance} />
                        <span className="checkmark high"></span>
                    </label>
                    <label className="container">Very High
                    <input type="radio" name="importance" value="importance3" checked={importance === "importance3"} onChange={this.handleImportance} />
                        <span className="checkmark veryHigh"></span>
                    </label>
                </div>
                <span className="deadline-title">Deadline</span>
                <input className="input-task-deadline" type="date" value={deadline} min={this.today} onChange={this.handleDeadline} />
                <button>Add Task</button>
            </form>
        );
    }
}

export default AddTask;