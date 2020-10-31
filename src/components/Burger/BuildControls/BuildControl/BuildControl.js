import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Lable}>{props.lable}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={}>More</button>
    </div>
  );
};

export default buildControl;
