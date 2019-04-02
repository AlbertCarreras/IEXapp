//TYPE IMPORTS
import {
    JWT, 
    LOGIN,
    ADD_ERROR_MESSAGE, 
    CLEAN_ERROR_MESSAGES,
} from '../Actions/types';
  
const initialState = {
    jwtToken: false,
    email: "",
    userId: null,
    loggedIn: false,
    errorMessages: {}
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
        case ADD_ERROR_MESSAGE:  
            return { ...state,
                errorMessages: {...state.errorMessages, [action.payload.key]: action.payload.value},
            }

        case CLEAN_ERROR_MESSAGES:
            return { ...state,
                errorMessages: {},
            }

        default:
            return state;
    }
}