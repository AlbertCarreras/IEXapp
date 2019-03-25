//TYPE IMPORTS
import {
    LOGOUT,
    LOGIN
} from './types';

export function login(data) {
    return {
        type: LOGIN,
        payload: {
            username: data.username,
            email: data.email,
        }
    }
}

export function logout() {
    return {
        type: LOGOUT,
    }
}