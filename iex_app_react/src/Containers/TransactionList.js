//IMPORT MODULES
import React from 'react';
import { connect } from "react-redux";

//IMPORT COMPONENTS
import TransactionLine from '../Presentational/TransactionLine'

//REDUX
const mapStateToProps = state => {
  return { 
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
   }
}

const TransactionList = props => {

  function createList() {
      const {transactions} = props;
      
      return transactions.length === 0 
        ? <div>There is no transaction history.</div>
        : transactions.map( tradeItem => <div key={tradeItem.id}>
          <TransactionLine data={tradeItem} />
      </div>)
  }

  return (
      <div className='sub-container'>
        <div className="header">TRANSACTIONS</div>
        {createList()}
      </div>
  );
}

export default connect(mapStateToProps, null)(TransactionList);