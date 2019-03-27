//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class PurchaseForm extends Component {

  state={
    ticker: "",
    quantity: "",
    errorMessage: "",
    tickerPrice: 0,
  }

  cleanState = () => {
    this.setState({
      quantity: "",
      tickerPrice: 0
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'ticker') this.cleanState()
  }

  fetchTicker = async () => {

    try {
      let resp = await fetch(`https://api.iextrading.com/1.0//stock/${encodeURI(this.state.ticker)}/price`)

      let respJSON = await resp.json()
      
      this.setState({
        tickerPrice: await respJSON,
        errorMessage: ""
      })

    } catch (error) { 
        this.setState({
          errorMessage: "Enter valid ticker symbol.",
          quantity: ""
        })
    }
  }

  displayTotal = () => {

    let totalPrice = symbolLibrary.getTotalPrice(this.state.tickerPrice, this.state.quantity)

    return this.state.tickerPrice === 0 || this.state.quantity === "" 
    ? null 
    : <div>for a total of
            ${totalPrice} USD {this.state.quantity > 1 ? `(${this.state.tickerPrice}/share)`: null}
      </div>
  }

  render() {
    return (
      <div >
        <div className="form">
              
              <label>
                <input 
                  type="text" 
                  placeholder="Ticker"
                  name="ticker"
                  onChange={ this.handleChange }
                  value={this.state.ticker} />
              </label>

              {
                this.state.errorMessage === "" 
                ? null 
                : <div>{this.state.errorMessage}</div>
              }

              <label>
                <input 
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  onChange={ (event) => {
                      this.handleChange(event)
                      this.fetchTicker()
                    }
                  }
                  value={this.state.quantity} />
              </label>

              {this.displayTotal()}
              
              <input 
                  className="button"
                  type="button" 
                  value="Purchase" 
                  onClick={this.getCurrPriceShares}/>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);