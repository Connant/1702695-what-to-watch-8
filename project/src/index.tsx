import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { fakeFilms } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App
      films={fakeFilms}
      currentFilm={fakeFilms[0]}
    />
  </React.StrictMode>,
  document.getElementById('root'));
