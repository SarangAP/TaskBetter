import React from 'react';
import MdRenderer from "../Template/MD_Renderer";
import TermsAndConditionsContent from "./Terms.md";
import "./Terms.css";
const Terms = () => {
  return (
    <div>
        <div className="md-content">
        <MdRenderer path={TermsAndConditionsContent} />
        </div>
    </div>

  );
}

export default Terms;
