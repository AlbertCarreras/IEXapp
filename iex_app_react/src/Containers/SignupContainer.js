//MODULE IMPORTS
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, NavLink} from 'react-router-dom';

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'
import authLibrary from './../Adapters/AdapterAuth'


//REDUX
const mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = { }


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

  handleSubmit = () => {
    // Signup and get confirmation user was created.
    return authLibrary
              .signup(this.state)
              .then(resp => { 
                if (resp.ok) {
                    // Login with same user and password and get JWT token.
                    authLibrary
                        .login(this.state)
                        .then(resp => {
                            authLibrary.setToken(resp.jwt);
                            this.props.jwtSavedInLocalStorage();
                            // this.props.history.push(config.route.URL_PORTFOLIO);
                    })
                    .catch(() => {
                      this.props.history.push(config.route.URL_LOGIN);
                    })
                  } 
                else{ 
                  resp.json()
                  .then(respJson => {
                    this.props.addErrorMessage("email", respJson.errors[0])
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
                  name="username" />
              </label>
              <label>
                <input 
                  type="email" 
                  placeholder="Email"
                  name="email" />
              </label>
              <label>
                <input 
                  type="password"
                  placeholder="Password"
                  name="password" />
              </label>
              <label>
                <input 
                  type="password"
                  placeholder="Confirmation Password"
                  name="confirmation password"
                  onChange={ this.handleChange }
                  onKeyUp={this.pressedEnter}
                  value={this.state.confirmPassword} />
            </label>
              <input 
                  className="button"
                  type="button" 
                  value="Create Account" />
            </div>
          
          <span>Have an account? </span> 
          <NavLink to={config.route.URL_LOGIN} exact>Log in</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));