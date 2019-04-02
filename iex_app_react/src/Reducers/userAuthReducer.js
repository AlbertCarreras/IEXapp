//TYPE IMPORTS
import {
    JWT, 
    LOGIN
} from '../Actions/types';
  
const initialState = {
    jwtToken: false,
    email: "",
    loggedIn: false
}

export default function userAuthReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                loggedIn: true
            }
        
        case JWT: {
            return { ...state,
                jwtToken: true,
            }
        }

        default:
            return state;
    }
}