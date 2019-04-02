//TYPES
import {
    ADD_ERROR_MESSAGE,
    CLEAN_ERROR_MESSAGES
} from './types';

//REDUX actions

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