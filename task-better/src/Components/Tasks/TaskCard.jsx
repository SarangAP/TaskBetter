import React, { useState, useEffect} from "react";
import Trash from "../icons/Trash";
import Caret from "../icons/Caret";
import CheckBox from "../icons/CheckBox";
import Editbox from "../icons/Editbox";
import moment from "moment";

const TaskCard = ({ task, handleDelete, handleUpdate }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [canEdit, setCanEdit] = useState(false);
  const [desc, setDesc] = useState(task.desctiption);
  const [due_date, setDueDate] = useState(task.due_date);
  const [priority, setPriority] = useState(task.priority);

  useEffect(() => {
    setDesc(task.description || "");
    setDueDate(task.due_date || "");
    setPriority(task.priority || "");
  }, [task]);

  const handleDropDown = () => {
    setCanEdit(false);
    setIsRotated(!isRotated);
  };
  const handleEdit = () => {
    if (canEdit) {
      task.description = desc
      task.due_date = due_date
      task.priority = priority
      handleUpdate(task)
    }
    setCanEdit(!canEdit);
    setIsRotated(true);
  };
  /*
  const handleComplete = () => {
    task.completed = !completed;
    handleUpdate(task);
    setCompleted(!completed);
  };
  */
 const handleComplete = () => {
    const newCompleted = completed === 0 ? 2 : 0;
    setCompleted(newCompleted);
    const updatedTask = { ...task, completed: newCompleted};
    handleUpdate(updatedTask);
 }
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  return (
    <div className="container task-card bg-light rounded-2 p-2 w-100 mb-3">
      <div className="row">
        <div className="col-sm-1">
          <CheckBox handleComplete={handleComplete} isCompleted={completed} />
        </div>
        <div className="col-sm-7">
          <h5 className="text-truncate expand-on-hover">{task.title}</h5>
        </div>
        <div className="col-sm-1">
          <Caret isRotated={isRotated} handleDropDown={handleDropDown} />
        </div>
        <div className="col-sm-1">
          <Editbox handleDropDown={handleEdit} />
        </div>
        <div className="col-sm-1">
          <Trash handleDelete={handleDelete} task={task} />
        </div>
      </div>

      {isRotated ? (
        canEdit ? (
          <div className={`row ${isRotated ? "visible" : "invisible"}`}>
            <div className="col-sm text-start ms-1">
              <label>Description: </label>
              <input
                className="form-control"
                value={desc}
                onChange={handleDescChange}
              />
              <label>Due Date: </label>
              <input
                type="date"
                className="form-control"
                value={due_date}
                onChange={handleDueDateChange}
              />
              <label>Priority: </label>
              <input
                className="form-control"
                value={priority}
                onChange={handlePriorityChange}
              />{" "}
              <p>
                Task created:{" "}
                {moment(task.created).format("MMMM DD, YYYY h:mm:ss A")}
              </p>
            </div>
          </div>
        ) : (
          <div className={`row ${isRotated ? "visible" : "invisible"}`}>
            <div className="col-sm text-start ms-1">
              <p>Description: {task.description}</p>
              <p>Due date: {moment(task.due_date).format("MM/DD/YYYY")}</p>
              <p>Priority: {task.priority}</p>
              <p>
                Task created:{" "}
                {moment(task.created).format("MMMM DD, YYYY h:mm:ss A")}
              </p>
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskCard;
