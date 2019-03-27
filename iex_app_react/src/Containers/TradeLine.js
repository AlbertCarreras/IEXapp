//MODULE IMPORTS
import React from 'react';

const TradeLine = props => {
    return (
        <div className="list container-flex-row">
          <div>{props.data.symbol}</div>
          <div>- {props.data.shares} {props.data.shares === 1 ? "share" : "shares"}</div>
          <div>${props.data.currentValue} {props.data.unitPurchase}</div>
        </div>
        
    );
}

export default TradeLine;