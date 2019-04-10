//IMPORT MODULES
import React from 'react';
import {Route, Switch} from "react-router-dom";

//IMPORT ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//IMPORT COMPONENTS
import LoginContainer from '../Containers/LoginContainer'
import SignupContainer from '../Containers/SignupContainer' 

//CONSTANTS
const {URL_SIGNUP, URL_ROOT} = config.route;

const RegistrationRouter = () => {
       
        return  <div className="welcome-container">
                    <div className="welcome-message"> Welcome to Your New IEX Trading App</div>
                    <div className="registration-form container-flex-column">
                        <Switch>
                            <Route
                                exact path={URL_SIGNUP}
                                component={SignupContainer}
                            />
                            <Route
                                path={URL_ROOT}
                                component={LoginContainer}
                            />    
                        </Switch>
                    </div>
                </div> 
};

export default RegistrationRouter;