//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink, withRouter} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import AdapterAuth from './../Adapters/AdapterAuth';

// ACTIONS
import { logout } from './../Actions/userAuthActions';

//REDUX
const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(logout())
  }
}

class Nav extends Component {

  handleLogout = () => {
    AdapterAuth.deleteToken();
    this.props.logout();
    this.props.history.push(config.route.URL_LOGIN);
  }

  render() {
    return (
      <div className="navbar container-flex-row">
        <div>My IEX Trading App</div>
        <div>
          <NavLink to={config.route.URL_PORTFOLIO} exact>Portfolio</NavLink> 
          <div> | </div>
          <NavLink to={config.route.URL_TRANSACTIONS} exact>Transactions</NavLink>
          <div> | </div>
          <span
            onClick={this.handleLogout}
          >Logout</span>
        </div>
      </div>
    );
  }
}

export default (withRouter( connect(null, mapDispatchToProps)(Nav) ));