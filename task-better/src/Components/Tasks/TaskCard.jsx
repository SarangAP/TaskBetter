import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const [isRotated, setIsRotated] = useState(false);
  const handleDropDown = () => {
    setIsRotated(!isRotated)
  }
  return (
    <div className="container task-card bg-light rounded-2 p-2 w-100 mb-3">
      <div className="row">
        <div className="col-sm-10">
          <h3 className="text-truncate expand-on-hover">{task.title}</h3>
        </div>
        <div className="col-sm-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-caret-down ${isRotated ? '' : 'rotate'}`}
            viewBox="0 0 16 16"
            onClick={handleDropDown}
          >
            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
          </svg>
        </div>
      </div>

      {isRotated ? (
        <div className={`row ${isRotated ? 'visible' : 'invisible'}`}>
          <div className="col-sm text-start ms-1">
            <p>{task.body}</p>
          </div>
        </div>

      ) : (<></>)}
    </div>
  );
};

export default TaskCard;
