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

      //TICKER FORMATTING
      tickerFormatValidator: function tickerFormatValidator(ticker) {
        let regexp = /([A-Z\-+]){1,5}/
        return regexp.test(ticker)
      },

      //CURRENCY FORMATTING
      getTotalFormattedPrice: function getTotalFormattedPrice(price, qty) {
        return symbolLibrary.formatCurrency(+ (price*qty).toFixed(2));
      },

      getTotalPrice: function getTotalPrice(price, qty) {
        return + (price*qty).toFixed(2);
      },

      formatCurrency: function formatCurrency(amount) {
        amount = + amount
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      },

      //NAME FORMATTING
      // Return name with each words capitalized
      capitalize: function capitalize(term) {
        return term.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      }
      
    }
})()

export default symbolLibrary;