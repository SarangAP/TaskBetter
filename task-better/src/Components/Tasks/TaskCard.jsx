import React, { useState } from "react";

const TaskCard = ({ task }) => {
  const [isRotated, setIsRotated] = useState(false);
  const handleDropDown = () => {
    setIsRotated(!isRotated);
  };
  return (
    <div className="container task-card bg-light rounded-2 p-2 w-100 mb-3">
      <div className="row">
        <div className="col-sm-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>
        </div>
        <div className="col-sm-8">
          <h5 className="text-truncate expand-on-hover">{task.title}</h5>
        </div>
        <div className="col-sm-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`bi bi-caret-down ${isRotated ? "" : "rotate"}`}
            viewBox="0 0 16 16"
            onClick={handleDropDown}
          >
            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
          </svg>
        </div>
        <div className="col-sm-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash trash-hover"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </div>
      </div>

      {isRotated ? (
        <div className={`row ${isRotated ? "visible" : "invisible"}`}>
          <div className="col-sm text-start ms-1">
            <p>{task.body}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskCard;
