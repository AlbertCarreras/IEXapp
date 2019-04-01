//CONSTANTS
import {config} from '../Adapters/AdapterConstants'

//TYPES
import {
    LOGIN, 
    LOGOUT
} from './../types';

//REDUX-THUNK actions with ASYNC/AWAIT
export const login = () => {

    return async function (dispatch) {

        let response = await fetch(`${config.url.API_ROOT}/user/auth`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })

        let responseJSON = await response.json()
        
        let dispatchLogin = (resp) => {
            dispatch( { 
                type: LOGIN,
                payload: {
                    name: resp.username,
                    email: resp.email
                }
            }) 
        }

        return dispatchLogin( responseJSON )
    }
}

//REDUX actions
  
export function logout() {
    return {
        type: LOGOUT,
    }
}