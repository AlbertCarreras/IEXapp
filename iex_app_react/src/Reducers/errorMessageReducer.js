//TYPE IMPORTS
import {
    ADD_ERROR_MESSAGE, 
    CLEAN_ERROR_MESSAGES,
} from '../Actions/types';
  
const initialState = {
    errorMessages: {}
}

export default function errorMessageReducer(state = initialState, action) {
    switch(action.type) {
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