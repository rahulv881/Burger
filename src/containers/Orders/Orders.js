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
    axios
      .get("https://react-my-burger-70072.firebaseio.com/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
       
        console.log('Fetch Orders');
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders });

      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
    console.log("Inside Orders.js: ");
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
