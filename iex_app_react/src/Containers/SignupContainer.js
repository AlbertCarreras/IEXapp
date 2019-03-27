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


class Signup extends Component {

  state={
    username: "",
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
          <div className="title">Sign up</div>
          <form className="form container-flex-column">
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
              <input 
                  className="button"
                  type="submit" 
                  value="Create Account" />
            </form>
          
          <span>Have an account? </span> 
          <NavLink to={config.route.URL_LOGIN} exact>Log in</NavLink>
      </div>
    );
  }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup)));