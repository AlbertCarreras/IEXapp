import React, {Fragment} from 'react';
import {Route, Switch} from "react-router-dom";

//ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//COMPONENTS
import LoginContainer from './LoginContainer'
import SignupContainer from './SignupContainer' 
import Loading from '../Presentation/Loading' 

const RegistrationContainer = () => {

    function displayRegistrationContainer () {
        // if () {
        //     return <Loading />
        // }
        return  <div className="welcome-container">
                    <div className="welcome-message"> Welcome to Your New IEX Trading App</div>
                    <div className="registration-form container-flex-column">
                        <Switch>
                            <Route
                                exact path={config.route.URL_SIGNUP}
                                component={SignupContainer}
                            />
                            <Route
                                path={config.route.URL_ROOT}
                                component={LoginContainer}
                            />    
                        </Switch>
                    </div>
                </div> 
    }

    return ( displayRegistrationContainer() );
};

export default RegistrationContainer;