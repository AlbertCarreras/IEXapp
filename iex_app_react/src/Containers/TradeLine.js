//MODULE IMPORTS
import React from 'react';

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

const TradeLine = props => {
    return (
        <div key={props.data.id} className="list container-flex-row">
          <div>{props.data.symbol} - {props.data.shares} {props.data.shares === 1 ? "share" : "shares"}: ${symbolLibrary.getTotalPrice(props.data.shares, props.currPrice)} {props.data.unitPurchase}
          </div>
        </div>
        
    );
}

export default TradeLine;