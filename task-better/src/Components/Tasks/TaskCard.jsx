import React, { useState } from "react";
import Trash from "../icons/Trash";
import Caret from "../icons/Caret";
import CheckBox from "../icons/CheckBox";

const TaskCard = ({ task }) => {
  const [isRotated, setIsRotated] = useState(false);
  const handleDropDown = () => {
    setIsRotated(!isRotated);
  };
  return (
    <div className="container task-card bg-light rounded-2 p-2 w-100 mb-3">
      <div className="row">
        <div className="col-sm-1">
          <CheckBox />
        </div>
        <div className="col-sm-8">
          <h5 className="text-truncate expand-on-hover">{task.title}</h5>
        </div>
        <div className="col-sm-1">
          <Caret isRotated={isRotated} handleDropDown={handleDropDown} />
        </div>
        <div className="col-sm-1">
          <Trash />
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
