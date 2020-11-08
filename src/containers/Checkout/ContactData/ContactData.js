import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    
    state = {
        name:'Rahul',
        email:'rahulvv88@gmail.com',
        address:{
            street:'476/1',
            postCode:'121005'
        },
        loading: false
    }

    orderHandler = (event)=>{
      event.preventDefault ();
      console.log(this.props.ingredients);

       this.setState({ loading: true });
       const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         customer: {
           name: "Rahul",
           address: {
             street: "476/1",
             zipCode: 121005,
             country: "India",
           },
           email: "rahulv881@gmail.com",
         },
         deliveryMethod: "Same Day",
       };
       axios.post("./orders.json", order)
         .then((response) => {
           this.setState({loading: false});
           this.props.history.push('/');
         })
         .catch((error) => {
           this.setState({loading: false}); 
         });
    }

    render(){
      let form = (
        <form>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className={classes.Input}
          />
          <input
            type="text"
            name="email"
            placeholder="Your Mail"
            className={classes.Input}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className={classes.Input}
          />
          <input
            type="text"
            name="postal code"
            placeholder="Postal Code"
            className={classes.Input}
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      );
      if (this.state.loading) {
        form = <Spinner />;
      }

      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form} 
          </div>
        );
    }
}

export default ContactData;