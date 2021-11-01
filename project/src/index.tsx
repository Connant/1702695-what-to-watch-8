import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { fakeFilms } from './mocks/films';
import { fakeReviews } from './mocks/reviews';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './components/reducer/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        films={fakeFilms}
        reviews={fakeReviews}
        // currentGenre={fakeFilms}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
