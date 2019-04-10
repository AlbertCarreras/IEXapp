//IMPORT MODULES
import React from 'react';
import { connect } from "react-redux";

//IMPORT ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//IMPORT COMPONENTS
import PurchaseForm from './PurchaseForm'

//REDUX
const mapStateToProps = state => {
  return { 
    currentBalance: state.trading.accountBalance,
   }
}

const PurchaseContainer = props => {

    const {currentBalance} = props;

    return (
      <div className="sub-container container-flex-column">
        <div>
          <div className="header">
            CASH - ${symbolLibrary.formatCurrency(currentBalance)} USD
          </div>
        </div>
        <PurchaseForm />
      </div>
    );
}

export default connect(mapStateToProps, null)(PurchaseContainer);