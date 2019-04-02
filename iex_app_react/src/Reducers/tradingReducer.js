//TYPE IMPORTS
import {
    PRICES_MAP,
    SAVE_USER_FINANCIALS
} from '../Actions/types';
  
const initialState = {
    accountBalance: 0,
    mapPrices: {},
    transactionList: []
}

export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {

        case PRICES_MAP:
            return { ...state,
                mapPrices: action.payload.mapPrices,
            }
        case SAVE_USER_FINANCIALS:
            return { ...state,
                transactionList: action.payload.transactions,
                accountBalance: action.payload.balance
            }
  
        default:
            return state;
    }
}