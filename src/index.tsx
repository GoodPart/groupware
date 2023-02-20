import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import CounterContainer from './containers/CounterContainer';

//start redux 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules';
import SigninContainer from './containers/SigninContainer';

import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(promiseMiddleware,ReduxThunk));

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* <App /> */}
    {/* <CounterContainer />; */}
    <SigninContainer />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
