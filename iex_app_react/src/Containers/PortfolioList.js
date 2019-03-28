//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TradeLine from './TradeLine'

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//REDUX
const mapStateToProps = state => {
  return { 
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

class PortfolioContainer extends Component {

  createList = () => {
      return this.props.transactions.map( tradeItem => <TradeLine 
                                                            currPrice={this.props.mapPrices[tradeItem.symbol]}
                                                            data={tradeItem} />)
  }

  getCurrentValueStock = () => {
    let total = this.props.transactions.reduce( (acc, transaction) => {
      let a = symbolLibrary.getTotalPrice(transaction.shares, this.props.mapPrices[transaction.symbol])
      return acc + a
    }, 0.00)

    return + total.toFixed(2)
  }

  render() {
    return (
        <div className='sub-container'>
          <div className="header">
            PORTFOLIO Current Value ${this.getCurrentValueStock()} USD*
          </div>
          {this.createList()}
          <div className="footnote">* Values calculated with Exchange Open Prices.</div>
        </div>
    );
  }
}

export default connect(mapStateToProps, null)(PortfolioContainer);