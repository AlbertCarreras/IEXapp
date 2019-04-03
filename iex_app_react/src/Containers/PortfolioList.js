//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TradeLine from './TradeLine'

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

// ACTIONS
import { sellShares } from './../Actions/sharesActions';

//REDUX
const mapStateToProps = state => {
  return { 
    id: state.user.id,
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    sellShares: (id, shareId) => dispatch(sellShares(id, shareId))
  }
}


class PortfolioContainer extends Component {

  trendPriceColor = (diffPrices) => {
    if (diffPrices === 0) return "grey"
    return diffPrices < 0 ? "green" : "red"
  }
  
  createList = () => {

      const {transactions, mapPrices} = this.props;

      return transactions.length === 0 
        ? <div>Your portfolio is empty.</div>
        : transactions
          .sort((a,b) => mapPrices[a.ticker].trend - mapPrices[b.ticker].trend
          )
          .map( tradeItem => <div key={tradeItem.id}>
            <TradeLine       
              latestPrice={mapPrices[tradeItem.ticker].latestPrice}
              diffPrice={mapPrices[tradeItem.ticker].trend}
              trendPriceColor={this.trendPriceColor}
              data={tradeItem} 
              sellShares={(shareId) => this.props.sellShares(this.props.id, shareId)}
              />
          </div>)
  }

  getCurrentValueStock = () => {

    const {transactions, mapPrices} = this.props;

    let total = transactions.reduce( 
      (accum, transaction) => {

        let pricePerShare = symbolLibrary.getTotalPrice(transaction.buy_amount, mapPrices[transaction.ticker].latestPrice)

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
          <div className="footnote">* Values calculated with Exchange Latest Prices.</div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);