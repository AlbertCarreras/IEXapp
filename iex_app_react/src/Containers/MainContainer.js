//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, withRouter} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//COMPONENTS
import NavContainer from './NavContainer'
import PortfolioContainer from './PortfolioContainer'
import TransactionContainer from './TransactionContainer'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class Login extends Component {
  render() {
    return (
      <div>
          <NavContainer />
          <Switch>
              <Route
                  exact path={config.route.URL_PORTFOLIO}
                  component={PortfolioContainer}
              />
              <Route
                  path={config.route.URL_TRANSACTIONS}
                  component={TransactionContainer}
              />    
          </Switch>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(Login)
                ));