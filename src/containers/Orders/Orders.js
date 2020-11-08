import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get("https://react-my-burger-70072.firebaseio.com/orders.json")
      .then((res) => {
        let fetchedOrders = [];
        for (let key of res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log("fetchedOrders: ");
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders});
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    console.log("Inside Orders.js: ");
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order key={order.id} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
