//MODULE IMPORTS
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import PurchaseContainer from './PurchaseContainer'
import PortfolioList from './PortfolioList'

//REDUX
const mapStateToProps = state => {
  return { 
    currentBalance: state.trading.accountBalance,
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,

   }
}

const mapDispatchToProps = { }

class PortfolioContainer extends Component {

  render() {
    return (
      <div className="portfolio-container container-flex-row">
        <PortfolioList />
        <PurchaseContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);