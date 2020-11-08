import React,{Component} from 'react';
import Auxilary from "../../hoc/Auxilary/Auxilary";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxilary/Auxilary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0,
    purchasable:false,
    purchasing: false,
    loading: false
  };

  componentDidMount(){
    axios.get('https://react-my-burger-70072.firebaseio.com/Ingredients.json')
    .then( response => 
      this.setState({ingredients: response.data})
    );
  }

  purchaseContinueHandler = () =>{

    const queryParams = [];
    for(let i in this.state.ingredients)
    {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });

  }

  purchaseCancelHandler = () =>{
    return this.setState({ purchasing: false });
  }

  purchaseHandler = () =>
  {
    return this.setState({purchasing:true});
  }

  updatePurchaseUpdate(ingredients)
  {
    //const ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients)
                .map((igKey)=>{
                  return ingredients[igKey];
                })
                .reduce((sum,el)=>{
                  return sum+el;
                },0);
    this.setState({purchasable: sum>0});
  }

  addIngredientsHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount+1;
    const updatedIngredients = {...this.state.ingredients};

    //console.log(...this.state.ingredients);
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice});
    this.setState({ingredients: updatedIngredients});

    this.updatePurchaseUpdate(updatedIngredients);
    //console.log(this.state);
    //console.log(this.state.ingredients);
  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0)
      return;
    
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };

    console.log(...this.state.ingredients);
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({ totalPrice: newPrice });
    this.setState({ ingredients: updatedIngredients });

    this.updatePurchaseUpdate(updatedIngredients);
    //console.log(this.state);
    //console.log(this.state.ingredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key]<=0;
    }

    let orderSummary = null;

    if(this.state.loading)
    {
      orderSummary = <Spinner />;
    }
    let burger = <Spinner />
    if(this.state.ingredients){
      burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          ingredientRemoved={this.removeIngredientsHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.state.purchasing}
          ordered={this.purchaseHandler}
        />
      </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinued={this.purchaseContinueHandler}
          pruchaseCancelled={this.purchaseCancelHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if(this.state.loading)
    {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);