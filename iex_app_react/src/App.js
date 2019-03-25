//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

//ADAPTERS
import {config} from './Adapters/AdapterConstants'

//COMPONENTS
import RegistrationContainer from './Containers/RegistrationContainer'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class App extends Component {
  routerFunction = () => {

    return <Route
        path={config.route.URL_ROOT}
        component={RegistrationContainer}
    />
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.routerFunction()}
        </header>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(App)
                ));