import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card bg-light rounded-2 p-2">
      <h3>{task.title}</h3>
      <p>{task.body}</p>
    </div>
  );
};

export default TaskCard;
