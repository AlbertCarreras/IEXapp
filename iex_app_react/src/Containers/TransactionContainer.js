//MODULE IMPORTS
import React from 'react';
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

const TransactionContainer = props => {
    return (
      <div className="container-flex-row portfolio-container">
        <TransactionList />
      </div>
    );
}

export default connect(mapStateToProps, null)(TransactionContainer);