//MODULE IMPORTS
import {applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


//ROOT REDUCER IMPORT
import reducer from '../Reducers/rootReducer';

let middleware = [thunk]
let enhancers = [ applyMiddleware(...middleware) ]

if ( process.env.NODE_ENV === 'development') {
  middleware.push(logger);
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
      reducer, 
      compose(...enhancers)
    )

export default store;