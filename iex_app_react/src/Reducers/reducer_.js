//TYPE IMPORTS
import {
    LOGIN,
} from '../Actions/types';
  
const initialState = {
    username: "",
    email: ""
}

export default function sectionAReducer(state = initialState, action) {
    switch(action.type) {

        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
            }
  
        default:
            return state;
    }
}