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

const mapDispatchToProps = { }

class PurchaseContainer extends Component {

  render() {
    return (
      <div className="sub-container container-flex-column">
        <div>
          <div className="header">
            CASH - ${symbolLibrary.formatCurrency(this.props.currentBalance)} USD
          </div>
        </div>
        <PurchaseForm />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseContainer);