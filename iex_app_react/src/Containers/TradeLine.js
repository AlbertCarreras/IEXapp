//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

// CONSTANTS
const divStyleNav = {
    green: { color: "green"},
    grey: { color: "grey"},
    red: { color: "red"}
};
const arrow = {
    green: "⬆",
    red: "⬇"
};


const TradeLine = props => {
    const {id, buy_amount, ticker, buy_currency} = props.data;
    const trend = props.trendPrice(props.openPrice, props.latestPrice)
    return (
          <div 
            className="list container-flex-row"
            style={divStyleNav[trend]}
            >{arrow[trend]} {ticker} - {buy_amount} {buy_amount === 1 ? "share" : "shares"}: ${symbolLibrary.getTotalFormattedPrice(buy_amount, props.latestPrice)} {buy_currency}

          <div
            className="sell-btn"
            onClick={() => props.sellShares(id)}
            >Sell</div>
        </div>
    );
}

export default TradeLine;