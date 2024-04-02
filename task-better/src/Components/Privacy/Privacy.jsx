import React from 'react';
import MD_Renderer from "../Template/MD_Renderer";
import PrivacyPolicyContent from "./Privacy.md";
import "./Privacy.css";
const Privacy = () => {
  return (
    <div>
        <div className="md-content">
        <MD_Renderer path={PrivacyPolicyContent} />
        </div>
    </div>

  );
}

export default Privacy;
