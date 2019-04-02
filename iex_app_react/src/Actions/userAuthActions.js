//CONSTANTS
import {config} from '../Adapters/AdapterConstants'

//TYPES
import {
    JWT, 
    LOGIN, 
    LOGOUT,
    ADD_ERROR_MESSAGE,
    CLEAN_ERROR_MESSAGES
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

export function jwtSavedInLocalStorage() {
    return {
        type: JWT,
    }
}

export function addErrorMessage(key, value) {
    return {
        type: ADD_ERROR_MESSAGE,
        payload: {
            key: key,
            value: value,
        }
    }
}

export function cleanErrorMessages() {
    return {
        type: CLEAN_ERROR_MESSAGES,
        payload: {
            errorMessages: {},
        }
    }
} 