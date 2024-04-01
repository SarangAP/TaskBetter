import React from 'react';
import MD_Renderer from "../Template/MD_Renderer";
import TermsAndConditionsContent from "./Terms.md";
import "./Terms.css";
const Terms = () => {
  return (
    <div>
        <div className="md-content">
        <MD_Renderer path={TermsAndConditionsContent} />
        </div>
    </div>

  );
}

export default Terms;
