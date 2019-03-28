//TYPE IMPORTS
import {
    PRICES_MAP
} from '../Actions/types';
  
const initialState = {
    accountBalance: 5000.00-300-3000-500,
    currentValueStocks: 1630,
    mapPrices: {},
    transactionList: [ 
        {   id: 1,
            symbol: "AAPL",
            shares: 1,
            pricePurchase: 300,
            unitPurchase: "USD",
            currentValue: 330,
        },
        {   id: 2,
            symbol: "AAT",
            shares: 2,
            pricePurchase: 1500,
            unitPurchase: "USD",
            currentValue: 1000
        },
        {   id: 3,
            symbol: "NFLX",
            shares: 5,
            pricePurchase: 100,
            unitPurchase: "USD",
            currentValue: 300
        },
        {   id: 4,
            symbol: "AAPL",
            shares: 5,
            pricePurchase: 100,
            unitPurchase: "USD",
            currentValue: 300
        },
        {   id: 4,
            symbol: "AEP-B",
            shares: 5,
            pricePurchase: 100,
            unitPurchase: "USD",
            currentValue: 300
        }
    ]
}

export default function userProfileReducer(state = initialState, action) {
    switch(action.type) {

        case PRICES_MAP:
            return { ...state,
                mapPrices: action.payload.mapPrices,
            }
  
        default:
            return state;
    }
}