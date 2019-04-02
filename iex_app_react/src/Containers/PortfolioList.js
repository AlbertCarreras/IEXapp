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
      return this.props.transactions.map( tradeItem => <div key={tradeItem.id}><TradeLine       
        currPrice={this.props.mapPrices[tradeItem.ticker]}
        data={tradeItem} /></div>)
  }

  getCurrentValueStock = () => {
    let total = this.props.transactions.reduce( (acc, transaction) => {
      let a = symbolLibrary.getTotalPrice(transaction.buy_amount, this.props.mapPrices[transaction.ticker])
      return acc + a
    }, 0.00)

    return symbolLibrary.formatCurrency(total)
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