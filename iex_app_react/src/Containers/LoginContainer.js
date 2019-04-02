//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterAuth'

// ACTIONS
import { jwtSavedInLocalStorage, addErrorMessage, cleanErrorMessages } from './../Actions/userAuthActions';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      errorMessages: state.user.errorMessages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()),
    addErrorMessage: (key, value) => dispatch(addErrorMessage(key, value)),
    cleanErrorMessages: () => dispatch(cleanErrorMessages()),
  }
}

class Login extends Component {

  state={
    email: "",
    password: ""
  }

  handleChange = (event) => {
    if(Object.keys(this.props.errorMessages).length > 0) this.props.cleanErrorMessages();
    
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  pressedEnter = (event) => {
    if (event.key === "Enter" ) {
      this.handleSubmit();
    }
  }
  
  handleSubmit = () => {
    if(Object.keys(this.props.errorMessages).length > 0) this.props.cleanErrorMessages();

    AdapterUser.login(this.state)
    .then(json => { 
      AdapterUser.setToken(json.jwt);
        this.props.jwtSavedInLocalStorage();
        this.props.history.push(config.route.URL_PORFOLIO)
    })
    .catch(() => {
      this.props.addErrorMessage("invalidCredentials", "The email or password did not match our records.")
    })
  }

  displayMessage = (field) => {
    if (this.props.errorMessages[field]) {
      return <p>{this.props.errorMessages[field]}</p>
    }
  }

  render() {
    return (
      <div >
          <div className="title">Log in</div>
          <div>{this.displayMessage("invalidCredentials")}</div>
          <div className="form container-flex-column">
              <label>
                <input 
                  type="email" 
                  placeholder="Email"
                  name="email"
                  onChange={ this.handleChange }
                  onKeyUp={this.pressedEnter}
                  value={this.state.email} />
              </label>
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={ this.handleChange }
                  onKeyUp={this.pressedEnter}
                  value={this.state.password} />
              </label>
              <input 
                  className="button"
                  type="button" 
                  onClick={ this.handleSubmit }
                  value="Log me in!" />
            </div>
          
          <span>New to the IEX Trading App? </span> 
          <NavLink to={config.route.URL_SIGNUP} exact>Sign up!</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));