//MODULE IMPORTS
import React from 'react';

const TradeLine = props => {
    return (
        <div className="list container-flex-row">
          <div>BUY ({props.data.symbol}) - {props.data.shares} {props.data.shares === 1 ? "share" : "shares"} @ ${props.data.pricePurchase} {props.data.unitPurchase}</div>
        </div>
        
    );
}

export default TradeLine;