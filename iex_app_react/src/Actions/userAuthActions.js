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
            
        try {

            let response = await fetch(`${config.url.API_ROOT}/users/auth`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            let responseJSON = await response.json()
            let dispatchLogin = (resp) => dispatch( { 
                    type: LOGIN,
                    payload: {
                        username: resp.username,
                        email: resp.email,
                        id: resp.id
                    }
                }) 

            let dispatchStoreShares = (resp) => dispatch( { 
                    type: SAVE_USER_FINANCIALS,
                    payload: {
                        shares: resp.shares,
                        transactions: resp.transactions,
                        balance: resp.balance
                    }
                }) 
                
            dispatchStoreShares( responseJSON )
            return dispatchLogin( responseJSON )
        }
        
        catch (err) { console.log(err) }
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