//CONSTANTS
import {config} from '../Adapters/AdapterConstants'

//TYPES
import {
    JWT, 
    LOGIN, 
    LOGOUT,
    SAVE_USER_FINANCIALS
} from './types';

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
        
        let dispatchLogin = (resp) => {console.log(resp)

            dispatch( { 
                type: LOGIN,
                payload: {
                    username: resp.username,
                    email: resp.email
                }
            }) 
        }

        let dispatchStoreShares = (resp) => {
            dispatch( { 
                type: SAVE_USER_FINANCIALS,
                payload: {
                    transactions: resp.shares,
                    balance: resp.balance
                }
            }) 
        }
        dispatchStoreShares( responseJSON )
        return dispatchLogin( responseJSON )
    }
}

//REDUX actions

export function logout() {
    return {
        type: LOGOUT,
    }
}

export function jwtSavedInLocalStorage() {
    return {
        type: JWT,
    }
}