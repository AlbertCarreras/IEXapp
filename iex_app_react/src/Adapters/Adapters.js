// export const symbols = {}

//   async function getSymbols() {
//     let resp = await fetch(`https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name`)

//     let respJSON = await resp.json()

//     respJSON.forEach( symbol => symbols[symbol["symbol"]] = symbol["name"])
//   }

//   getSymbols();
// }

let symbolLibrary = (function () {
    return {

      getTotalPrice: function getTotalPrice(price, qty) {
        return + (price*qty).toFixed(2);
      },

      tickerFormatValidator: function tickerFormatValidator(ticker) {
        let regexp = /([A-Z\-+]){1,5}/
        console.log(ticker, regexp.test(ticker))
        return regexp.test(ticker)
      }
      
    }
})()

export default symbolLibrary;