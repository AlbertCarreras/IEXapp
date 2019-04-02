//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterAuth'

// ACTIONS
import { jwtSavedInLocalStorage } from './../Actions/userAuthActions';
import { addErrorMessage, cleanErrorMessages } from './../Actions/errorMessageActions';

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      errorMessages: state.errorMessage.errorMessages,
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

  handlePressEnter = (event) => {
    if (event.key === "Enter" ) {
      this.handleSubmit();
    }
  }
  
  handleSubmit = () => {

    const {jwtSavedInLocalStorage, errorMessages, cleanErrorMessages, addErrorMessage, history} = this.props;

    if(Object.keys(errorMessages).length > 0) cleanErrorMessages();

    AdapterUser.login(this.state)
    .then(resp => { 
      AdapterUser.setToken(resp.jwt);
        jwtSavedInLocalStorage();
        history.push(config.route.URL_PORTFOLIO)
    })
    .catch(() => {
      addErrorMessage("invalidCredentials", "The email or password did not match our records.")
    })
  }

  displayMessage = (field) => {

    const {errorMessages} = this.props;

    if (errorMessages[field]) {
      return <p>{errorMessages[field]}</p>
    }
  }

  render() {

    const {email, password} = this.state;
    const {URL_SIGNUP} = config.route;

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
                  onKeyUp={this.handlePressEnter}
                  value={email} />
              </label>
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={password} />
              </label>
              <input 
                  className="button"
                  type="button" 
                  onClick={this.handleSubmit}
                  value="Log me in!" />
            </div>
          
          <span>New to the IEX Trading App? </span> 
          <NavLink to={URL_SIGNUP} exact>Sign up!</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));