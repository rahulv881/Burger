import React, {Component} from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){
      console.log("[Order Summar] will Update");
    }

    render() {
      const ingredientSummary = Object.keys(this.props.ingredients).map(
        (igKey) => {
          return (
            <li key={igKey}>
              <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
              {this.props.ingredients[igKey]}
            </li>
          );
        }
      );
      return (
      <Auxilary>
        <h3>Your Order</h3>
        <p>A delicious with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.pruchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxilary>
      );
    }
}

export default OrderSummary;