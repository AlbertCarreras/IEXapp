//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'
import divStyleLibrary from '../Styling/DivStyleLibrary'

const TradeLine = props => {
    const {id, buy_amount, ticker, buy_currency} = props.data;
    const color = props.trendPriceColor(props.diffPrice)

    return (
          <div 
            className="list-item container-flex-row"
            style={divStyleLibrary.trend[color]}
            >

            <span><b>{ticker}</b> </span>
            
            <div
                className="sell-btn"
                onClick={() => props.sellShares(id)}
                >Sell</div>
            
            <span>{symbolLibrary.getTotalFormattedPrice(buy_amount, props.latestPrice)}</span>
            
            <span className="portfolio-note">
                <span>{buy_currency} </span>
                <span>/ {buy_amount}</span>
                <span>{buy_amount === 1 ? " share" : " shares"}</span>
            </span>
            
            <span className="trend-price portfolio-note">
                <span>{divStyleLibrary.arrow[color]}</span>
                <span>{symbolLibrary.formatCurrency(props.diffPrice)}</span>
            </span>
            
        </div>
    );
}

export default TradeLine;