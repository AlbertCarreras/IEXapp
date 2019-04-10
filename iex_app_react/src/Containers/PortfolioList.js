//IMPORT MODULES
import React from 'react';
import { connect } from "react-redux";

//IMPORT COMPONENTS
import TradeLine from '../Presentational/TradeLine'

//IMPORT ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//IMPORT ACTIONS
import { sellShares } from './../Actions/sharesActions';

//REDUX
const mapStateToProps = state => {
  return { 
    id: state.user.id,
    shares: state.trading.shareList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    sellShares: (id, shareId) => dispatch(sellShares(id, shareId))
  }
}

const PortfolioList = props => {

  function trendPriceColor(diffPrices) {
    if (diffPrices === 0) return "grey"
    return diffPrices < 0 ? "green" : "red"
  }
  
  function createList() {

      const {shares, mapPrices, sellShares, id} = props;

      return shares.length === 0 
        ? <div>Your portfolio is empty.</div>
        : shares
          .sort((a,b) => mapPrices[a.ticker].trend - mapPrices[b.ticker].trend
          )
          .map( tradeItem => <div key={tradeItem.id}>
            <TradeLine       
              latestPrice={mapPrices[tradeItem.ticker].latestPrice}
              diffPrice={mapPrices[tradeItem.ticker].trend}
              trendPriceColor={trendPriceColor}
              data={tradeItem} 
              sellShares={(shareId) => sellShares(id, shareId)}
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

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioList);