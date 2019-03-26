//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route, withRouter} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class TransactionContainer extends Component {
  render() {
    return (
      <div>
        TRANSACTION
      </div>    
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);