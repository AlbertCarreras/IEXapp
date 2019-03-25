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
        return   <Switch>
                    <Route
                        exact path={config.route.URL_SIGNUP}
                        component={SignupContainer}
                    />
                    <Route
                        path={config.route.URL_ROOT}
                        component={LoginContainer}
                    />    
                </Switch>
    }

    return (
        <Fragment>

           {displayRegistrationContainer()}
            
        </Fragment>
    );
};

export default RegistrationContainer;