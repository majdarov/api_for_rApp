import React from "react";
import spiner from "../../../Assets/img/placeholder.svg";

let Preloader = (props) => {
  return (
    <div>
      <img src={spiner} alt="" />
    </div>
  );
};

export default Preloader;