import React,{Component} from 'react';
import Auxilary from "../../hoc/Auxilary/Auxilary";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from "../../axios-orders"; 
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxilary/Auxilary';

import { connect } from 'react-redux';
import * as burgerBuilderActions from './../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount(){
    this.props.onInitIngrediets();
  }

  purchaseContinueHandler = () =>{

    this.props.history.push('/checkout');

  }

  purchaseCancelHandler = () =>{
    return this.setState({ purchasing: false });
  }

  purchaseHandler = () =>
  {
    return this.setState({purchasing:true});
  }

  updatePurchaseState(ingredients)
  {
    //const ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients)
                .map((igKey)=>{
                  return ingredients[igKey];
                })
                .reduce((sum,el)=>{
                  return sum+el;
                },0);
    return sum>0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0;
    }

    let orderSummary = null;

   
    let burger = this.props.error? <p>This State can't be loaded</p> : <Spinner />
    if(this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchasing={this.state.purchasing}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseContinued={this.purchaseContinueHandler}
          pruchaseCancelled={this.purchaseCancelHandler}
          price={this.props.price}
        />
      );
    }


    return (
      <Auxilary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxilary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngrediets: () => dispatch(burgerBuilderActions.initIngredients() )
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));