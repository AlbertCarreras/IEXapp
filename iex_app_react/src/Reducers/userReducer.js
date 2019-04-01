//TYPE IMPORTS
import {
    LOGIN,
} from '../Actions/types';
  
const initialState = {
    username: "",
    email: "",
    loggedIn: false
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {

        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                loggedIn: true
            }
  
        default:
            return state;
    }
}