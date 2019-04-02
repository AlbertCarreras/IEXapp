//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//COMPONENTS
import NavContainer from './NavContainer'
import PortfolioContainer from './PortfolioContainer'
import TransactionContainer from './TransactionContainer'

//CONSTANTS
const {URL_PORTFOLIO, URL_TRANSACTIONS, URL_ROOT} = config.route;
const URL_REDIRECT = "/portfolio";

class Login extends Component {

  render() {
    return (
      <div>
          <NavContainer />
          <div className="main-container">
            <Switch>
                <Route
                    exact path={URL_PORTFOLIO}
                    component={PortfolioContainer}
                />
                <Route
                    exact path={URL_TRANSACTIONS}
                    component={TransactionContainer}
                />   
                <Route
                  exact path={URL_ROOT}
                  component={PortfolioContainer}
                /> 
                <Redirect to={URL_REDIRECT} />
            </Switch>
          </div>
      </div>
    );
  }
}

export default (withRouter(connect(null, null)(Login)));