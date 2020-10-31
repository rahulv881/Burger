import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {lable:'Salad',type: 'salad'},
    {lable:'Bacon',type: 'bacon'},
    {lable:'Cheese',type: 'cheese'},
    {lable:'Meat',type:'meat'}
];

const buildControls = (props) =>{
    return (
      <div className={classes.BuildControls}>
        {controls.map((ctrl) => (
          <BuildControl
            key={ctrl.lable}
            lable={ctrl.type}
            added={() => props.ingredientAdded(ctrl.type)}
          />
        ))}
      </div>
    );
};

export default buildControls;