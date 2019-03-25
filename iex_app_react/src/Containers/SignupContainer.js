//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class Signup extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Sign up
          <NavLink to={config.route.URL_LOGIN} exact>Log in</NavLink>
        </header>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(Signup)
                ));