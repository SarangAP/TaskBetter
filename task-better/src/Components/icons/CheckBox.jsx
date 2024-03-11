import React from "react";
import { ReactSVG } from "react-svg";
import checkboxsvg from './checkbox.svg'
import uncheckboxsvg from './uncheckbox.svg'

const CheckBox = ({ handleComplete, isCompleted }) => {
  return (
    <div className="">
      {isCompleted ? (
        <>
          <img src={checkboxsvg} alt="Check" width="20px" height="20px" onClick={handleComplete} />
        </>
      ) : (
        <>
          <img src={uncheckboxsvg} alt="Check" width="20px" height="20px" onClick={handleComplete} />
        </>
      )}
    </div>
  );
};

export default CheckBox;
