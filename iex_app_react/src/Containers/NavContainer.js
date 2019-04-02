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

const divStyleNav = {
  fontWeight: '600'
};

class Nav extends Component {
  
  handleClick = (tab) => {
    this.setState({
      selected: tab
    })
  }

  handleLogout = () => {
    AdapterAuth.deleteToken();
    this.props.logout();
    this.props.history.push(config.route.URL_LOGIN);
  }

  checkRoute = (tab) => {
    var pathname = window.location.pathname;
    if (pathname === tab || '/') {
      return divStyleNav
    } else if (pathname === tab) {
      return divStyleNav
    } else { return null }
  }

  render() {
    return (
      <div className="navbar container-flex-row">
        <div>My IEX Trading App</div>
        <div>
          <NavLink 
              className="navLink"
              style={this.checkRoute("portfolio")}
              to={config.route.URL_PORTFOLIO} exact>Portfolio</NavLink> 
          <NavLink 
            className="navLink"
            style={this.checkRoute("transactions")}
            to={config.route.URL_TRANSACTIONS} exact>Transactions</NavLink>
          <span
            className="navLink" 
            onClick={this.handleLogout}
          >Logout</span>
        </div>
      </div>
    );
  }
}

export default (withRouter( connect(null, mapDispatchToProps)(Nav) ));