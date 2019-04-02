//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import AdapterAuth from './../Adapters/AdapterAuth'

// ACTIONS
import { jwtSavedInLocalStorage } from './../Actions/userAuthActions';
import { addErrorMessage, cleanErrorMessages } from './../Actions/errorMessageActions';

//CONSTANTS
const {URL_LOGIN, URL_PORTFOLIO, URL_SIGNUP} = config.route;

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()),
    addErrorMessage: (key, value) => dispatch(addErrorMessage(key, value)),
    cleanErrorMessages: () => dispatch(cleanErrorMessages()),
  }
}

const mapStateToProps = state => {
  return {
      errorMessages: state.errorMessage.errorMessages,
  }
}


class Signup extends Component {

  state={
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = (event) => {

    if(Object.keys(this.props.errorMessages).length > 0) this.props.cleanErrorMessages();

    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // Helper method to display error messages under each field.
  displayErrors = (field) => {

    const {errorMessages} = this.props;

    return errorMessages[field] 
            ? <p>{errorMessages[field]}</p>
            : null
  }

  handlePressEnter = (event) => {
    if (event.key === "Enter" ) {
      this.evaluateFields();
    }
  }

  evaluateFields = () => {

    const {cleanErrorMessages, addErrorMessage} = this.props;
    const {username, email, password, confirmPassword} = this.state;

    cleanErrorMessages();

    var submitSignIn = true;

    if (!username.trim()) {
      submitSignIn = false;
      addErrorMessage("username", "Enter a username.")
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      submitSignIn = false;
      addErrorMessage("email", "Invalid email address.")
    }

    if (!(password.length > 7)) {
      submitSignIn = false;
      addErrorMessage("password", "Password must be at least 8 characters.")
    }

    if (!!(password.length > 7)) {
      if (!(password === confirmPassword)) {
        submitSignIn = false;
        addErrorMessage("confirmation", "Confirmation password must match password.")
      }
    }

    return submitSignIn
      ? this.handleSubmit() 
      : null;
  }

  handleSubmit = () => {

    const {jwtSavedInLocalStorage, addErrorMessage, history} = this.props;

    // Signup and get confirmation user was created.
    return  AdapterAuth.signup(this.state)
        .then(resp => { 
          if (resp.ok) {
              // Login with same user and password and get JWT token.
              AdapterAuth.login(this.state)
              .then(resp => {
                AdapterAuth.setToken(resp.jwt);
                jwtSavedInLocalStorage();
                history.push(URL_PORTFOLIO)
              })
              .catch(() => {
                history.push(URL_LOGIN);
              })
            } 
          else{ 
            resp.json()
            .then(r => {
              addErrorMessage("email", r.errors[0])
            })
          }
        })
      .catch(() => {
        history.push(URL_SIGNUP);
      })
  }

  render() {
    
    const {username, email, password, confirmPassword} = this.state;
    const {URL_LOGIN} = config.route;

    return (
      <div >
          <div className="title">Sign up</div>
          
          <div className="form container-flex-column">
              <label>
                <input 
                  type="text" 
                  placeholder="Username"
                  name="username" 
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={username}/>
              </label>
              {this.displayErrors("username")}
              <label>
                <input 
                  type="email" 
                  placeholder="Email"
                  name="email" 
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={email}/>
              </label>
              {this.displayErrors("email")}
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  name="password" 
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={password}/>
              </label>
              {this.displayErrors("password")}
              <label>
                <input 
                  type="password"
                  placeholder="Confirmation Password"
                  name="confirmPassword"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={confirmPassword} />
            </label>
            {this.displayErrors("confirmation")}
              <input 
                  className="button"
                  type="button" 
                  onClick={this.evaluateFields}
                  value="Create Account" />
            </div>
          
          <span>Have an account? </span> 
          <NavLink to={URL_LOGIN} exact>Log in</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));