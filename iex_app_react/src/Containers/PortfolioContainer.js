//MODULE IMPORTS
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import PurchaseContainer from './PurchaseContainer'
import PortfolioList from './PortfolioList'

// ACTIONS
import { getCurrentSharePrices } from '../Actions/sharesActions';

//REDUX
const mapStateToProps = state => {
  return { 
    currentBalance: state.trading.accountBalance,
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentSharePrices: (transactions) => dispatch(getCurrentSharePrices(transactions)), 
  }
}

class PortfolioContainer extends Component {

  componentDidMount() {
    if (this.props.transactions.length !== 0)this.props.getCurrentSharePrices(this.props.transactions)
  }

  isPortfolioUpdating = () => {
    return (this.props.transactions.length !== 0 
    && 
    Object.entries(this.props.mapPrices).length === 0)
  }

  render() {
    return (
      <div className="container-flex-row portfolio-container">
        { this.isPortfolioUpdating() 
          ? <div>Updating your portfolio...</div>
          : <Fragment>
              <PortfolioList />
              <PurchaseContainer />
            </Fragment>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);