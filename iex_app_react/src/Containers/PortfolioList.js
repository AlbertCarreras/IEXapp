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

      const {transactions, mapPrices} = this.props;

      return transactions.length === 0 
        ? <div>Your portfolio is empty.</div>
        : transactions.map( tradeItem => <div key={tradeItem.id}><TradeLine       
        currPrice={mapPrices[tradeItem.ticker]}
        data={tradeItem} /></div>)
  }

  getCurrentValueStock = () => {

    const {transactions, mapPrices} = this.props;

    let total = transactions.reduce( 
      (accum, transaction) => {

        let pricePerShare = symbolLibrary.getTotalPrice(transaction.buy_amount, mapPrices[transaction.ticker])

        return accum + pricePerShare

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