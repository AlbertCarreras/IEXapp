//TYPE IMPORTS
//TYPE IMPORTS
import {
    LOGIN,
} from '../Actions/types';
  
const initialState = {
    accountBalance: 5000.00-300-3000-500,
    currentValueStocks: 1630,
    transactionList: [ 
        {   symbol: "AAPL",
            shares: 1,
            pricePurchase: 300,
            unitPurchase: "USD",
            currentValue: 330,
        },
        {   symbol: "ATT",
            shares: 2,
            pricePurchase: 1500,
            unitPurchase: "USD",
            currentValue: 1000
        },
        {   symbol: "NFLX",
            shares: 5,
            pricePurchase: 100,
            unitPurchase: "USD",
            currentValue: 300
        }
    ]
}

export default function userProfileReducer(state = initialState, action) {
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