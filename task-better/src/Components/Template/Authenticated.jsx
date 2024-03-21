import React, {useEffect } from "react";
import TBNav from "../TBNav/TBNav";

const Authenticated = ({ page }) => {
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token && token != null) {
      console.log("Session Token", sessionStorage.getItem("token"));
    } else {
      if (window.location.pathname !== "/") {
        console.log("NO TOKEN", console.log(window.location.pathname));
        window.location.href = "/";
      }
    }
  }, []);
  return (
    <>
      <TBNav />
      {page}
    </>
  );
};

export default Authenticated;
