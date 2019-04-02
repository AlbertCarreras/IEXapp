//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {

    const {buy_amount, ticker, buy_price, buy_currency} = props.data;

    return (
          <div className="list container-flex-row">BUY ({ticker}) - {buy_amount} {buy_amount === 1 ? "share" : "shares"} @ ${symbolLibrary.formatCurrency(buy_price)} {buy_currency}
          </div>        
    );
}

export default TradeLine;