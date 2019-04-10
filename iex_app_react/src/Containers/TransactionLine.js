//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {

    const {action_amount, ticker, action_price, currency, status} = props.data;

    return (
          <div className="list-item container-flex-row">{status === "active"? "BUY" : "SOLD"} ({ticker}) - {action_amount} {action_amount === 1 ? "share" : "shares"} @ ${symbolLibrary.formatCurrency(action_price)} {currency}
          </div>        
    );
}

export default TradeLine;