//TYPE IMPORTS
import {
    PRICES_MAP,
    SAVE_USER_FINANCIALS,
    LIST_BOUGHT_SHARES
} from '../Actions/types';
  
const initialState = {
    accountBalance: undefined,
    mapPrices: {},
    transactionList: [],
    shareList: []
}

export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {

        case PRICES_MAP:
            return { ...state,
                mapPrices: action.payload.mapPrices
            }
        case SAVE_USER_FINANCIALS:
            return { ...state,
                shareList: action.payload.shares,
                transactionList: action.payload.transactions,
                accountBalance: action.payload.balance
            }
        case LIST_BOUGHT_SHARES:
            return { ...state,
                shareList: [...state.shareList, action.payload.new_share],
                transactionList: [...state.transactionList, action.payload.new_transaction],
                accountBalance: action.payload.balance,
                mapPrices: {}
            }
  
        default:
            return state;
    }
}