import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { AuthorizationStatus } from './const';

import { fetchFilmsAction, ThunkAppDispatch } from './store/actions-api';

const api = createAPI(() => AuthorizationStatus.Auth);

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));

(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
