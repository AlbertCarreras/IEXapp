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
    shares: state.trading.shareList,
    currentValueStocks: state.trading.currentValueStocks,
    mapPrices: state.trading.mapPrices,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentSharePrices: (shares) => dispatch(getCurrentSharePrices(shares)), 
  }
}

class PortfolioContainer extends Component {

  componentDidMount() {
    this.getCurrentSharePrices()
  }

  componentDidUpdate(prevProps) {
    if (this.props.shares !== prevProps.shares) {
      this.getCurrentSharePrices()
    }
  }

  getCurrentSharePrices = () => {
    const {shares, getCurrentSharePrices} = this.props;
    if (shares.length !== 0) return getCurrentSharePrices(shares)
  }

  isPortfolioUpdating = () => {

    const {shares, mapPrices} = this.props;

    return (shares.length !== 0 
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