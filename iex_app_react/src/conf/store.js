//MODULE IMPORTS
import {applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//ROOT REDUCER IMPORT
import reducer from '../Reducers/rootReducer';

const middleware = [thunk]
// let enhancers = [ applyMiddleware(...middleware) ]

if ( process.env.NODE_ENV === 'development') {
  middleware.push(logger);
  // enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

// const store = createStore(
//   reducer, 
//   compose(...enhancers)
// )

const store = compose(applyMiddleware(...middleware))(createStore)(reducer);

export default store;