//IMPORT MODULES
import React from 'react';
import { connect } from "react-redux";
import { NavLink, withRouter} from 'react-router-dom';

//IMPORT ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import AdapterAuth from './../Adapters/AdapterAuth';
import symbolLibrary from '../Adapters/Adapters'
import divStyleLibrary from '../Styling/DivStyleLibrary'

//IMPORT ACTIONS
import { logout } from './../Actions/userAuthActions';

//CONSTANTS
const {URL_LOGIN, URL_PORTFOLIO, URL_TRANSACTIONS} = config.route;

//REDUX
const mapStateToProps = state => {
  return { 
    username: state.user.username,
   }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(logout())
  }
}

const NavMenu = props => {

  function handleLogout() {
    AdapterAuth.deleteToken();
    props.logout();
    props.history.push(URL_LOGIN);
  }

  function checkRoute(tab) {
    var pathname = window.location.pathname;
    if (pathname === (`/${tab}` || '/')) {
      return divStyleLibrary.navigation
    } else if (pathname === `/${tab}`) {
      return divStyleLibrary.navigation
    } else { return null }
  }

  return (
      <div className="navbar container-flex-row">
        <div>
          My IEX Trading App
          <div className="portfolio-note">(signed in as {symbolLibrary.capitalize(props.username)})</div>
        </div>
        <div>
          <NavLink 
              className="navLink"
              style={checkRoute("portfolio")}
              to={URL_PORTFOLIO} exact>Portfolio</NavLink> 
          <NavLink 
            className="navLink"
            style={checkRoute("transactions")}
            to={URL_TRANSACTIONS} exact>Transactions</NavLink>
          <span
            className="navLink" 
            onClick={handleLogout}
          >Logout</span>
        </div>
      </div>
    );
}

export default (withRouter( connect(mapStateToProps, mapDispatchToProps)(NavMenu) ));