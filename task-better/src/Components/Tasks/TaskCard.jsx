import React, { useState } from "react";
import Trash from "../icons/Trash";
import Caret from "../icons/Caret";
import CheckBox from "../icons/CheckBox";

const TaskCard = ({ task, handleDelete, handleUpdate }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleDropDown = () => {
    setIsRotated(!isRotated);
  };
  const handleComplete = () => {
    task.completed = !completed
    handleUpdate(task)
    setCompleted(!completed);
  };
  return (
    <div className="container task-card bg-light rounded-2 p-2 w-100 mb-3">
      <div className="row">
        <div className="col-sm-1">
          <CheckBox handleComplete={handleComplete} isCompleted={completed} />
        </div>
        <div className="col-sm-8">
          <h5 className="text-truncate expand-on-hover">{task.title}</h5>
        </div>
        <div className="col-sm-1">
          <Caret isRotated={isRotated} handleDropDown={handleDropDown} />
        </div>
        <div className="col-sm-1">
          <Trash handleDelete={handleDelete} task={task} />
        </div>
      </div>

      {isRotated ? (
        <div className={`row ${isRotated ? "visible" : "invisible"}`}>
          <div className="col-sm text-start ms-1">
            <p>{task.description}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskCard;
