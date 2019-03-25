//MODULE IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './conf/serviceWorker';

//STYLE
import './css/index.css';
import './css/App.css';

//STORE
import store from './conf/store'

//IMPORTS
import App from './App';

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
