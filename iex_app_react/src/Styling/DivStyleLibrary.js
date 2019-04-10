//library for inline styling 

let divStyleLibrary = (function () {
  return {

    trend: {
      green: { color: "green"},
      grey: { color: "grey"},
      red: { color: "red"}
    },
    
    arrow: {
      green: "⬆",
      red: "⬇"
    },
    
    navigation: {
      fontWeight: '600'
    }

  }

})()

export default divStyleLibrary;