import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { reducer } from './store/reducer';

import { createAPI } from './services/api';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/action';
import { fetchFilmsAction, checkAuthorizationAction } from './store/actions-api';
import { configureStore } from '@reduxjs/toolkit';
import { redirect } from './store/redirect';
// import { State } from './store/reducer';


const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

// const loadState = () => {
//   try {
//     const serialisedState = window.localStorage.getItem('app_state');
//     if (!serialisedState) {
//       return undefined;
//     }
//     return JSON.parse(serialisedState);
//   } catch (err) {
//     return undefined;
//   }
// };

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


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ToastContainer /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
