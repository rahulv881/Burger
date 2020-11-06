import React, {Component} from "react";
import Auxilary from "../../hoc/Auxilary";
import classes from "./Layout.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerShowHandler = ()=>{
    this.setState({showSideDrawer: true})
  }

  sideDrawerClosedHander = ()=>{
    this.setState( (prevState) => { 
      return {showSideDrawer: !prevState.showSideDrawer}; 
    });
  }

  render(){
    return (
      <Auxilary>
        <Toolbar open={this.sideDrawerShowHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHander}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxilary>
    ); 
  }
}

export default Layout;
