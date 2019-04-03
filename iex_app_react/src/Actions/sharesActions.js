//TYPE IMPORTS
import {
    PRICES_MAP,
    LIST_BOUGHT_SHARES,
    SAVE_USER_FINANCIALS
} from './types';

//CONSTANTS
import {config} from '../Adapters/AdapterConstants'

//REDUX-THUNK actions

export const getCurrentSharePrices = (transactions) => {

    return async function (dispatch) {

        let mappedArrSymb = transactions.map(item  => item.ticker)
  
        let setSymb = new Set(mappedArrSymb)
      
        let strSymb = encodeURIComponent(Array.from(setSymb).join(","))
  
        let url =`https://api.iextrading.com/1.0/stock/market/batch?symbols=${strSymb}&types=quote`

        function mapJson(resp) { 
            let map = {}
            for(let i in resp) {
                let openPrice = resp[i].quote.open
                let latestPrice = resp[i].quote.latestPrice
                let trend = openPrice - latestPrice
                map[i] = {
                    openPrice: openPrice,
                    latestPrice: latestPrice,
                    trend: trend
                }
            }
            return map
        }

        try {

            let response = await fetch(url)

            let mapPrices = mapJson(await response.json()) 
            
            let dispatchSaveCurrentSharePrices = (mapPrices) => dispatch( { 
                type: PRICES_MAP,
                payload: {
                    mapPrices: mapPrices
                }
            })
            
            return dispatchSaveCurrentSharePrices(mapPrices)
        
        } catch (err) {        }
    }
}

export const buyShares = (ticker, amount, id) => {

    const {API_ROOT} = config.url

    return async function (dispatch) {

        let response = await fetch(`${API_ROOT}/users/${id}/shares`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                  },
                body: JSON.stringify({
                    "shares": {
                        "ticker": ticker.toUpperCase(),
                        "amount": amount
                }})
              })

        let responseJSON = await response.json()
        
        let listBoughtShares = (resp) => dispatch({ 
            type: LIST_BOUGHT_SHARES,
            payload: {
                new_transaction: resp.share,
                balance: resp.balance
            }
        })
        
        return listBoughtShares( responseJSON ) 
    }
}

export const sellShares = (id, shareId) => {

    const {API_ROOT} = config.url

    return async function (dispatch) {

        let response = await fetch(`${API_ROOT}/users/${id}/shares/${shareId}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                  }
              })
        let responseJSON =  await response.json()
        
        let listCurrentShares = (resp) => dispatch({ 
            type: SAVE_USER_FINANCIALS,
            payload: {
                transactions: resp.shares,
                balance: resp.balance
            }
        })
        
        return listCurrentShares( responseJSON ) 
    }
}