//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//COMPONENTS
import PurchaseForm from './PurchaseForm'

//REDUX
const mapStateToProps = state => {
  return { 
    currentBalance: state.trading.accountBalance,
   }
}

class PurchaseContainer extends Component {

  render() {

    const {currentBalance} = this.props;

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
}

export default connect(mapStateToProps, null)(PurchaseContainer);