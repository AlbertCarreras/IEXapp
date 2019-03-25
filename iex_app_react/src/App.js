//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Hello
        </header>
      </div>
    );
  }
}

export default (withRouter(
                  connect(mapStateToProps, mapDispatchToProps)(App)
                ));