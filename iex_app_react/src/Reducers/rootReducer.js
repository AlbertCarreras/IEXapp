//MODULE IMPORTS
import { combineReducers } from "redux";

//TYPE IMPORTS
import {
    LOGOUT
} from '../Actions/types';

//REDUCER IMPORTS
import user from "./userReducer";
import trading from "./tradingReducer";


const combinedReducers = combineReducers({
    user,
    trading
});

const reducer = (state, action) => {
    // LOGOUT action sends undefined state, which will make each reducer return their initial state on the default action.
    if (action.type === LOGOUT) {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reducer;
  
  