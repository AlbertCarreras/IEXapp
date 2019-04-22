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
            {this.state.toggle ? <LineChart data={[]} size={[300,250]} /> : null}
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);