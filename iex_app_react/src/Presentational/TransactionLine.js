//IMPORT MODULES
import React from 'react';

//IMPORT ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {

    const {action_amount, ticker, action_price, currency, status} = props.data;

    return (
          <div className="list-box container-flex-row">{status === "active"? "BUY" : "SOLD"} ({ticker}) - {action_amount} {action_amount === 1 ? "share" : "shares"} @ ${symbolLibrary.formatCurrency(action_price)} {currency}
          </div>        
    );
}

export default TradeLine;