import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Router as BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { reducer } from './store/reducer';

import { createAPI } from './services/api';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/action';
import { fetchFilmsAction, checkAuthorizationAction, fetchPromoAction } from './store/actions-api';
import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './store/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';


const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.Auth)));

const browserHistory = createBrowserHistory();

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});


(store.dispatch)(checkAuthorizationAction());
(store.dispatch)(fetchFilmsAction());
(store.dispatch)(fetchPromoAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
