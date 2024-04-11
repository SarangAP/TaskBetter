import React from 'react';
import MdRenderer from "../Template/MD_Renderer";
import PrivacyPolicyContent from "./Privacy.md";
import "./Privacy.css";
const Privacy = () => {
  return (
    <div>
        <div className="md-content">
        <MdRenderer path={PrivacyPolicyContent} />
        </div>
    </div>

  );
}

export default Privacy;
