import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const checkoutSummary = (props) => {
  /*const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {this.props.ingredients[igKey]}
      </li>
    );
  });
*/

  console.log("Inside checkoutSummar:");
  console.log(props.ingredients);
  
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope it tastes well! </h1>
      <div style={{ widht: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
