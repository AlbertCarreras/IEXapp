//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

// ACTIONS
import { addErrorMessage, cleanErrorMessages } from './../Actions/errorMessageActions';
import { buyShares } from './../Actions/sharesActions';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      errorMessages: state.errorMessage.errorMessages,
      id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addErrorMessage: (key, value) => dispatch(addErrorMessage(key, value)),
    cleanErrorMessages: () => dispatch(cleanErrorMessages()),
    buyShares: (ticker, amount, id) => dispatch(buyShares(ticker, amount, id))
  }
}

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
      tickerPrice: 0,
      errorMessage: ""
    })
  }

  handleChange = (event) => {

    if(Object.keys(this.props.errorMessages).length > 0) this.props.cleanErrorMessages();

    this.setState({
      [event.target.name]: event.target.value,
    });
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
        this.props.addErrorMessage("invalidTicker", "Enter a valid ticker symbol.")

        this.setState({
          errorMessage: "Enter a valid ticker symbol.",
          quantity: ""
        })
    }
  }

  displayTotal = () => {

    const {tickerPrice, quantity} = this.state;

    let totalPrice = symbolLibrary.getTotalFormattedPrice(tickerPrice, quantity)

    return tickerPrice === 0 || quantity === "" 
    ? null 
    : <div>for a total of
            ${totalPrice} USD {quantity > 1 ? `($${symbolLibrary.formatCurrency(tickerPrice)}/share)`: null}
      </div>
  }

  displayMessage = (field) => {

    const {errorMessages} = this.props;
   
    if (errorMessages[field]) {
      return <p>{errorMessages[field]}</p>
    }
  }

  buyShares = () => {
    const {ticker, quantity} = this.state
    const {buyShares, id} = this.props

    buyShares(ticker, quantity, id)
    this.cleanState()
  }

  render() {
    const {ticker, quantity} = this.state;
    return (
      <div >
        <div className="form">
              
              <label>
                <input 
                  type="text" 
                  placeholder="Ticker"
                  name="ticker"
                  onChange={ this.handleChange }
                  value={ticker.toUpperCase()} />
              </label>

              <div>{this.displayMessage("invalidTicker")}</div>

              <label>
                <input 
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  name="quantity"
                  onChange={ (event) => {
                      this.handleChange(event)
                      this.fetchTicker()
                    }
                  }
                  value={quantity} />
              </label>

              <div>{this.displayMessage("insufficientFunds")}</div>
              <div>{this.displayTotal()}</div>
              
              <input 
                  className="button"
                  type="button" 
                  value="Purchase" 
                  onClick={this.buyShares}/>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);