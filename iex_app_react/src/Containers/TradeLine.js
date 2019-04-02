//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {
    return (
          <div className="list container-flex-row">{props.data.ticker} - {props.data.buy_amount} {props.data.buy_amount === 1 ? "share" : "shares"}: ${symbolLibrary.getTotalFormattedPrice(props.data.buy_amount, props.currPrice)} {props.data.buy_currency}
        </div>
    );
}

export default TradeLine;