//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, NavLink, withRouter} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class Login extends Component {
  render() {
    return (
      <div className="navbar container-flex-row">
        <div>My IEX Trading App</div>
        <div>
          <NavLink to={config.route.URL_PORTFOLIO} exact>Portfolio</NavLink> 
          <div> | </div>
          <NavLink to={config.route.URL_TRANSACTIONS} exact>Transactions</NavLink>
        </div>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(Login)
                ));