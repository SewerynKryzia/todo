import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const Task = props => {
    const { active, deadline, importance, id, text, doneDate } = props.task
    if (active) {
        const deadlineDay = new Date(deadline).toLocaleDateString();
        return (
            <div className={"active-task " + importance}>
                <h3 className="task-text">
                    {text}
                </h3>
                <p className="task-deadline">
                    <span>Deadline</span>
                    {deadlineDay}
                </p>
                <button className="done-btn" onClick={() => props.doneTask(id)}>
                    <i className="fas fa-check"></i>
                </button>
                <button className="remove-btn" onClick={() => props.removeTask(id)}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

        );
    }
    else {
        const doneDay = new Date(doneDate).toLocaleDateString();
        return (
            <div className={"inactive-task"}>
                <h4 className="task-text">
                    {text}
                </h4>
                <p className="task-done-date">
                    <span>Done Date</span>
                    {doneDay}
                </p>
                <button className="undo-btn" onClick={() => props.undoTask(id)}>
                    <i className="fas fa-undo-alt"></i>
                </button>
                <button className="remove-btn" onClick={() => props.removeTask(id)}>
                    <i className="fas fa-times"></i>
                </button>
            </div >

        );
    }
}

export default Task;