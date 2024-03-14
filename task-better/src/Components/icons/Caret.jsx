import React from "react";

const Caret = ({isRotated, handleDropDown}) => {
  return (
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
  );
};

export default Caret;
