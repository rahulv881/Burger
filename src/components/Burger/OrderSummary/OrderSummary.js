import React from 'react';
import Auxilary from '../../../hoc/Auxilary';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
                                .map(igKey => {
                                    return (
                                        <li key={igKey}>
                                            <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                                        </li>
                                    );
                                });

    return (
    <Auxilary>
        <h3>Your Order</h3>
        <p>A delicious with the following ingredients: </p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total price: {props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={props.purchaseCancelled} >CANCEL</Button>
        <Button clicked={props.purchaseContinued} >CONTINUE</Button>
    </Auxilary>
);
}

export default orderSummary;