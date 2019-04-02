//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

//ADAPTERS
import {config} from './Adapters/AdapterConstants'
// import symbols from './Adapters/AdapterSymb'

//COMPONENTS
import RegistrationContainer from './Containers/RegistrationContainer'
import MainContainer from './Containers/MainContainer'

//REDUX
const mapStateToProps = (state) => {
  return { 
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = { };

class App extends Component {
  routerFunction = () => {

    return this.props.loggedIn
    ? <MainContainer />
    : <Switch>
        <Route
          path={config.route.URL_ROOT}
          component={RegistrationContainer}
        />
      </Switch>
}

  render() {
    return (
      <div>
          {this.routerFunction()}
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(App)
                ));