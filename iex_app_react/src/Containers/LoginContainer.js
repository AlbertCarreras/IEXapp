//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


class Login extends Component {

  state={
    email: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div >
          <div className="title">Log in</div>
          <form className="form">
              <label>
                <input 
                  type="email" 
                  placeholder="Email"
                  name="email"
                  onChange={ this.handleChange }
                  value={this.state.email} />
              </label>
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={ this.handleChange }
                  value={this.state.password} />
              </label>
              <input 
                  className="button"
                  type="submit" 
                  value="Log me in!" />
            </form>
          
          <span>New to the IEX Trading App? </span> 
          <NavLink to={config.route.URL_SIGNUP} exact>Sign up!</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));