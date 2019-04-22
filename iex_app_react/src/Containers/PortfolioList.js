//IMPORT MODULES
import React from 'react';
import { connect } from "react-redux";

//IMPORT COMPONENTS
import TradeContainer from './TradeContainer'

//IMPORT ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//REDUX
const mapStateToProps = state => {
  return { 
    shares: state.trading.shareList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

const PortfolioList = props => {
  
  function createList() {

      const {shares, mapPrices} = props;

      return shares.length === 0 
        ? <div>Your portfolio is empty.</div>
        : shares
          .sort((a,b) => mapPrices[a.ticker].trend - mapPrices[b.ticker].trend
          )
          .map( tradeItem => <div key={tradeItem.id}>
            <TradeContainer  
              data={tradeItem} 
            />
          </div>)
  }

  function getCurrentValueStock() {

    const {shares, mapPrices} = props;

    let total = shares.reduce( 
      (acc, transaction) => {

        let pricePerShare = symbolLibrary.getTotalPrice(transaction.buy_amount, mapPrices[transaction.ticker].latestPrice)

        return acc + pricePerShare

    }, 0.00)

    return symbolLibrary.formatCurrency(total)
  }

    return (
        <div className='sub-container'>
          <div className="header">
            PORTFOLIO Current Value ${getCurrentValueStock()} USD*
          </div>
          {createList()}
          <div className="footnote">* Values calculated with Exchange Latest Prices.</div>
        </div>
    );
}

export default connect(mapStateToProps, null)(PortfolioList);