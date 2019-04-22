//IMPORT MODULES
import React, {Component} from 'react';
import { connect } from "react-redux";

//IMPORT COMPONENTS
import TradeLine from '../Presentational/TradeLine'
import LineChart from '../Presentational/LineChart'

//IMPORT ACTIONS
import { sellShares } from './../Actions/sharesActions';

//REDUX
const mapStateToProps = state => {
  return { 
    id: state.user.id,
    mapPrices: state.trading.mapPrices,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    sellShares: (id, shareId) => dispatch(sellShares(id, shareId))
  }
}

class TradeContainer extends Component {

  state = {
    toggle: false,
    chartData: []
  }

  componentDidMount() {
    let {ticker} = this.props.data
    fetch (`https://api.iextrading.com/1.0/stock/${ticker}/chart`)
    .catch(console.log)
    .then(resp => resp.json())
    .then(resp => {
      let arr = resp.map(elem => ({ date: new Date(elem.date), open: elem.open}))
      this.setState({
         chartData: arr
       })
    })
  }

  trendPriceColor = (diffPrices) => {
    if (diffPrices === 0) return "grey"
    return diffPrices < 0 ? "green" : "red"
  }

  handleMouseOver = () => {
    this.setState({ toggle: true})
  }

  handleMouseOut = () => {
    this.setState({ toggle: false})
  }
  
  render() {
    const { mapPrices, sellShares, id, data} = this.props;
    return (
        <div 
          className="list-box"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          >
            <TradeLine  
                mapPrices={mapPrices}     
                trendPriceColor={this.trendPriceColor}
                data={data} 
                sellShares={(shareId) => sellShares(id, shareId)}/>
            {this.state.toggle 
              ? this.state.chartData.length > 0 
                ? <LineChart chartData={this.state.chartData} size={[300,250]} />
                : <div>Loading chart</div> 
              : null}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);