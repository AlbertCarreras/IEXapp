//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//ADAPTERS
import symbolLibrary from '../Adapters/Adapters'

// ACTIONS
import { addErrorMessage, cleanErrorMessages } from './../Actions/errorMessageActions';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      errorMessages: state.errorMessage.errorMessages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addErrorMessage: (key, value) => dispatch(addErrorMessage(key, value)),
    cleanErrorMessages: () => dispatch(cleanErrorMessages()),
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

    let totalPrice = symbolLibrary.getTotalFormattedPrice(this.state.tickerPrice, this.state.quantity)

    return this.state.tickerPrice === 0 || this.state.quantity === "" 
    ? null 
    : <div>for a total of
            ${totalPrice} USD {this.state.quantity > 1 ? `($${symbolLibrary.formatCurrency(this.state.tickerPrice)}/share)`: null}
      </div>
  }

  displayMessage = (field) => {
    if (this.props.errorMessages[field]) {
      return <p>{this.props.errorMessages[field]}</p>
    }
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