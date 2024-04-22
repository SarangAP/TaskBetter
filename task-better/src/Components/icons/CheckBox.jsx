import React from "react";
import { ReactSVG } from "react-svg";
import checkboxsvg from './checkbox.svg'
import uncheckboxsvg from './uncheckbox.svg'
import iprogress from './inprogress.svg'

const CheckBox = ({ handleComplete, isCompleted }) => {
  return (
    <div className="">
      {isCompleted === 0 ? (
        <>
          <img src={uncheckboxsvg} alt="Check" width="20px" height="20px" onClick={handleComplete} />
        </>
      ) : isCompleted === 1 ? (
          <img src={iprogress} alt="In Progress" width="20px" height="20px" onClick={handleComplete} />
      ) :(
        <>
          <img src={checkboxsvg} alt="Check" width="20px" height="20px" onClick={handleComplete} />
        </>
      )}
    </div>
  );
};

export default CheckBox;
