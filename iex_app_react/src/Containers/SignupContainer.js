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
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // Helper method to display error messages under each field.
  displayErrors = (field) => {
    return this.props.errorMessages[field] 
    ? <p>{this.props.errorMessages[field]}</p>
    : null
  }

  handlePressEnter = (event) => {
    if (event.key === "Enter" ) {
      this.evaluateFields();
    }
  }

  evaluateFields = () => {
    this.props.cleanErrorMessages();
    var submitSignIn = true;
    if (!this.state.username.trim()) {
      submitSignIn = false;
      this.props.addErrorMessage("username", "Enter a username.")
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      submitSignIn = false;
      this.props.addErrorMessage("email", "Invalid email address.")
    }
    if (!(this.state.password.length > 7)) {
      submitSignIn = false;
      this.props.addErrorMessage("password", "Password must be at least 8 characters.")
    }
    if (!!(this.state.password.length > 7)) {
      if (!(this.state.password === this.state.confirmPassword)) {
        submitSignIn = false;
        this.props.addErrorMessage("confirmation", "Confirmation password must match password.")
      }
    }
    return submitSignIn
      ? this.handleSubmit() 
      : null;
  }

  handleSubmit = () => {
    // Signup and get confirmation user was created.
    return  AdapterAuth.signup(this.state)
        .then(json => { 
          if (json.ok) {
              // Login with same user and password and get JWT token.
              AdapterAuth.login(this.state)
              .then(json => {
                AdapterAuth.setToken(json.jwt);
                this.props.jwtSavedInLocalStorage();
                this.props.history.push(config.route.URL_PORTFOLIO)
              })
              .catch(() => {
                this.props.history.push(config.route.URL_LOGIN);
              })
            } 
          else{ 
            json.json()
            .then(r => {
              this.props.addErrorMessage("email", r.errors[0])
            })
          }
        })
      .catch(() => {
        this.props.history.push(config.route.URL_SIGNUP);
      })
  }

  render() {
    return (
      <div >
          <div className="title">Sign up</div>
          
          <div className="form container-flex-column">
              <label>
                <input 
                  type="text" 
                  placeholder="Username"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  name="username" />
              </label>
              {this.displayErrors("username")}
              <label>
                <input 
                  type="email" 
                  placeholder="Email"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  name="email" />
              </label>
              {this.displayErrors("email")}
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  name="password" />
              </label>
              {this.displayErrors("password")}
              <label>
                <input 
                  type="password"
                  placeholder="Confirmation Password"
                  name="confirmPassword"
                  onChange={ this.handleChange }
                  onKeyUp={this.handlePressEnter}
                  value={this.state.confirmPassword} />
            </label>
            {this.displayErrors("confirmation")}
              <input 
                  className="button"
                  type="button" 
                  onClick={this.evaluateFields}
                  value="Create Account" />
            </div>
          
          <span>Have an account? </span> 
          <NavLink to={config.route.URL_LOGIN} exact>Log in</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));