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
      <div >
        <NavLink to={config.route.URL_PORTFOLIO} exact>Portfolio</NavLink> | <NavLink to={config.route.URL_TRANSACTIONS} exact>Transactions</NavLink>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(Login)
                ));