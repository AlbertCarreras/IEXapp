import React from 'react';
import {Route, Switch} from "react-router-dom";

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//COMPONENTS
import LoginContainer from './LoginContainer'
import SignupContainer from './SignupContainer' 

//CONSTANTS
const {URL_SIGNUP, URL_ROOT} = config.route;

const RegistrationContainer = () => {

    function displayRegistrationContainer () {
       
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
    }

    return ( displayRegistrationContainer() );
};

export default RegistrationContainer;