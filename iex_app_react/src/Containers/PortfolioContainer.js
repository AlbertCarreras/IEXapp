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
    this.getCurrentSharePrices()
  }

  componentDidUpdate(prevProps) {
    if (this.props.transactions !== prevProps.transactions) {
      this.getCurrentSharePrices()
    }
  }

  getCurrentSharePrices = () => {
    const {transactions, getCurrentSharePrices} = this.props;
    if (transactions.length !== 0) return getCurrentSharePrices(transactions)
  }

  isPortfolioUpdating = () => {

    const {transactions, mapPrices} = this.props;

    return (transactions.length !== 0 
    && 
    Object.entries(mapPrices).length === 0)
  }

  render() {
    return (
        <Fragment>
        { this.isPortfolioUpdating() 
          ? <div>Updating your portfolio...</div>
          : <div className="portfolio-container">
              <PortfolioList />
              <PurchaseContainer />
            </div>
        }
        </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);