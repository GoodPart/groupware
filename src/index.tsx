import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import CounterContainer from './containers/CounterContainer';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Header from './routers/Header';
import RouteArea from './routers/RouteArea'

//start redux 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, {rootSaga} from './modules';
import { composeWithDevTools } from '@redux-devtools/extension'; // 리덕스 개발자 도구

//redux saga
import createSagaMiddleware from 'redux-saga';

//redux middleware
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'

//사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware,ReduxThunk, sagaMiddleware)));

// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.
sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <RouteArea />
      {/* <CounterContainer /> */}
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
