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
import { requireAuthorization } from './store/action';
import { fetchFilmsAction, ThunkAppDispatch, checkAuthorizationAction } from './store/actions-api';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));

(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());
(store.dispatch as ThunkAppDispatch)(checkAuthorizationAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
