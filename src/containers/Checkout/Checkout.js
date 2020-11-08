import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummar";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let params of query.entries()) {
      
      if( params[0] === 'price')
      {
        price =  params[1];  
      }
      else  
      {
        ingredients[params[0]] = +params[1];
      }  
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
    console.log("Inside Checkout.js:");
    console.log(this.state.ingredients);


    //this.props.history.goBack();
    //console.log("Inside Checkout: ");
    //console.log(this.props);
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props} />) }
        />
      </div>
    );
  }
}

export default withRouter(Checkout);
