//TYPE IMPORTS
import {
    PRICES_MAP
} from './types';

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
                map[i] = resp[i].quote.open
            }
            return map
        }

        try {

            let response = await fetch(url)

            let mapPrices = mapJson(await response.json()) 
            
            let dispatchSaveCurrentSharePrices = (resp) => dispatch( { 
                type: PRICES_MAP,
                payload: {
                    mapPrices: resp,
                }
            })
            
            return dispatchSaveCurrentSharePrices(mapPrices)
        
        } catch (err) {}
    }
}
