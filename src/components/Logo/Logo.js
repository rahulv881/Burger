import React from "react";
import burgerLogoPath from "../../assets/images/burger-logo.png";

import classes from "./Logo.css";

const logo = (props) => {
  return (
    <div
     className={classes.Logo}
     style={{ height: props.height }}>
      <img src={burgerLogoPath} alt="MyBurger" />
    </div>
  );
};

export default logo;
