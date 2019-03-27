//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//COMPONENTS
import TradeLine from './TradeLine'

//REDUX
const mapStateToProps = state => {
  return { 
    transactions: state.trading.transactionList,
    currentValueStocks: state.trading.currentValueStocks,
   }
}

const mapDispatchToProps = { }

class PortfolioContainer extends Component {

  getCurrPriceShares =  () => {

    let arrSymb = this.props.transactions.map(item  => item.symbol)

    let setSymb = new Set(arrSymb)

    let decodeSymb = decodeURI(Array.from(setSymb).join(","))

    console.log(decodeSymb)

    // try {
    //   let resp = await fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${strSymb}&types=quote`)

    //   console.log(await resp.json())

    // } catch (error) {     }
  }


  createList = () => {
      return this.props.transactions.map( tradeItem => <TradeLine data={tradeItem} />)
  }

  render() {
    return (
        <div className='sub-container'>
          <div className="header">
            PORTFOLIO Current Value ${this.props.currentValueStocks}USD
          </div>
          {    this.getCurrPriceShares()          }
          {this.createList()}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);