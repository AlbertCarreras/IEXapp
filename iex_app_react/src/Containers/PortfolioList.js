//MODULE IMPORTS
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TradeLine from './TradeLine'

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
      return this.props.transactions.map( tradeItem => <TradeLine data={tradeItem} />)
  }

  render() {
    return (
        <div>
          <div className="header">
            PORTFOLIO Current Value ${this.props.currentValueStocks}USD
          </div>
          {this.createList()}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);