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


class PortfolioContainer extends Component {

  createList = () => {
      
      const {transactions} = this.props;

      return transactions.length === 0 
      ? <div>There is no transaction history.</div>
      : transactions.map( tradeItem => <div key={tradeItem.id}>
        <TransactionLine data={tradeItem} />
      </div>)
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

export default connect(mapStateToProps, null)(PortfolioContainer);