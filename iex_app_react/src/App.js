//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

//ADAPTERS
import {config} from './Adapters/AdapterConstants'
import AdapterAuth from './Adapters/AdapterAuth'

//COMPONENTS
import RegistrationContainer from './Containers/RegistrationContainer'
import MainContainer from './Containers/MainContainer'

// ACTIONS
import { login, jwtSavedInLocalStorage } from './Actions/userAuthActions';

//CONSTANTS
const {URL_ROOT} = config.route;

//REDUX
const mapStateToProps = (state) => {
  return { 
    loggedIn: state.user.loggedIn,
    jwtToken: state.user.jwtToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(login()), 
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()) 
  }
}

class App extends Component {

  componentDidMount() { 

    const {jwtSavedInLocalStorage, login} = this.props

    if (AdapterAuth.getToken()) {
      jwtSavedInLocalStorage();
      login();
    }
  }

  // When the component updates, check for several conditional statements.
  componentDidUpdate(prevProps){  
    // Check if the user just logged in and the JWT token got saved in localStorage. If so, login the user, return the user info.
    if (prevProps.jwtToken === false && this.props.jwtToken === true) {
      if (AdapterAuth.getToken()) {
        this.props.login();
      }
    }
  }
  
  routerFunction = () => {
    return this.props.loggedIn
    ? <MainContainer />
    : <Switch>
        <Route
          path={URL_ROOT}
          component={RegistrationContainer} />
      </Switch>
  }

  render() {
    return ( <div>{this.routerFunction()}</div> );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));