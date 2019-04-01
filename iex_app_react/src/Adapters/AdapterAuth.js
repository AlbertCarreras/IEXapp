// ADAPTERS
import {config} from './AdapterConstants'
import {INIT_HEADERS} from './AdapterConstants'

let authLibrary = (function () {

  return {

    //JWT management
    // Save JWT token in local storage.
    setToken: function setToken(jsonToken) {
      return localStorage.setItem("token", jsonToken)
    },


  // Get JWT token from local storage.
  getToken: function getToken(jsonToken) {
    return localStorage.getItem("token")
  },

  // Delete JWT token from local storage.
  deleteToken: function deleteToken() {
    localStorage.removeItem("token")
  },

  // Fetch email/password to login and receive JWT token as a response. JWT is then used in getCurrentUser -Thunk action- ro retrieve user information
  deleteToken: async function login(loginState) {

    let response = await fetch(`${config.url.API_ROOT}/user_token`, {
      method: 'POST',
      headers: INIT_HEADERS,
      body: JSON.stringify({
        "auth": {
          "email": loginState.email.toLowerCase(),
          "password": loginState.password
        }})
    })
    let responseJSON = await response.json()

    return responseJSON
  }

  // Fetch sing-up information to signup and receive JWT token as a response. JWT is then used in getCurrentUser -Thunk action- ro retrieve user information
  signup: async function signup(signupState) {

    let response = await fetch(`${config.url.API_ROOT}/users/create`, {
      method: 'POST',
      headers: INIT_HEADERS,
      body: JSON.stringify({
        "user": {
          "email": signupState.email.toLowerCase(),
          "password": signupState.password,
          "password_confirmation": signupState.confirmPassword,
          "username": signupState.username
        }})
    })

    return response
  }        
}

export default authLibrary;
