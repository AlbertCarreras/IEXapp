//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TransactionLine from './TransactionLine'

//REDUX
const mapStateToProps = state => {
  return { 
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
   }
}

const mapDispatchToProps = { }

class PortfolioContainer extends Component {

  createList = () => {
      return this.props.transactions.map( tradeItem => <TransactionLine data={tradeItem} />)
  }

  render() {
    return (
        <div className='sub-container'>
          <div className="header">
            TRANSACTIONS
          </div>
          {this.createList()}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);