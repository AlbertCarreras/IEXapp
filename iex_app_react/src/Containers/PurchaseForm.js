//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class PurchaseForm extends Component {

  state={
    ticker: "",
    quantity: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div >
          <form className="form">
              <label>
                <input 
                  type="text" 
                  placeholder="Ticker"
                  name="ticker"
                  onChange={ this.handleChange }
                  value={this.state.ticker} />
              </label>
              <label>
                <input 
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  onChange={ this.handleChange }
                  value={this.state.quantity} />
              </label>
              <input 
                  className="button"
                  type="submit" 
                  value="Purchase" />
            </form>
          </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseForm);