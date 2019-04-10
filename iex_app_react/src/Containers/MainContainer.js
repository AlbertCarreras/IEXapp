//IMPORT MODULES
import React from 'react';
import { Switch, Route, withRouter, Redirect} from 'react-router-dom';

//IMPORT ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//IMPORT COMPONENTS
import NavMenu from './NavMenuContainer'
import Portfolio from './PortfolioContainer'
import Transactions from './TransactionContainer'

//CONSTANTS
const {URL_PORTFOLIO, URL_TRANSACTIONS, URL_ROOT} = config.route;
const URL_REDIRECT = "/portfolio";

const MainContainer = () => {

    return (
      <div>
          <NavMenu />
          <div className="main-container">
            <Switch>
                <Route
                    exact path={URL_PORTFOLIO}
                    component={Portfolio}
                />
                <Route
                    exact path={URL_TRANSACTIONS}
                    component={Transactions}
                />   
                <Route
                  exact path={URL_ROOT}
                  component={Portfolio}
                /> 
                <Redirect to={URL_REDIRECT} />
            </Switch>
          </div>
      </div>
    );
}

export default withRouter(MainContainer);