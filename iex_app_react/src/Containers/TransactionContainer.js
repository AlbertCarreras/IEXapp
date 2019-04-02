//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TransactionList from './TransactionList'

//REDUX
const mapStateToProps = state => {
  return { 
    currentBalance: state.trading.accountBalance,
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
   }
}

class TransactionContainer extends Component {

  render() {
    return (
      <div className="container-flex-row portfolio-container">
        <TransactionList />
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TransactionContainer);