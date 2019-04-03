//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {
    const {id, buy_amount, ticker, buy_currency} = props.data;

    return (
          <div className="list container-flex-row">{ticker} - {buy_amount} {buy_amount === 1 ? "share" : "shares"}: ${symbolLibrary.getTotalFormattedPrice(buy_amount, props.currPrice)} {buy_currency}

          <div
            onClick={() => props.sellShares(id)}
            >Sell</div>
        </div>
    );
}

export default TradeLine;