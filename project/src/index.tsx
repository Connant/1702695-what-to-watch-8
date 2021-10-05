import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const PROMO = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014,
  previewImage: 'img/bg-the-grand-budapest-hotel.jpg',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
};

const FILMS = [
  {
    id: 1,
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
    previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  },
  {
    id: 2,
    name: 'Bohemian Rhapsody',
    previewImage: 'img/bohemian-rhapsody.jpg',
  },
  {
    id: 3,
    name: 'Macbeth',
    previewImage: 'img/macbeth.jpg',
  },
  {
    id: 4,
    name: 'Aviator',
    previewImage: 'img/aviator.jpg',
  },
  {
    id: 5,
    name: 'We need to talk about Kevin',
    previewImage: 'img/we-need-to-talk-about-kevin.jpg',
  },
  {
    id: 6,
    name: 'What We Do in the Shadows',
    previewImage: 'img/what-we-do-in-the-shadows.jpg',
  },
  {
    id: 7,
    name: 'Revenant',
    previewImage: 'img/revenant.jpg',
  },
  {
    id: 8,
    name: 'Johnny English',
    previewImage: 'img/johnny-english.jpg',
  },
  {
    id: 9,
    name: 'Shutter Island',
    previewImage: 'img/shutter-island.jpg',
  },
  {
    id: 10,
    name: 'Pulp Fiction',
    previewImage: 'img/pulp-fiction.jpg',
  },
  {
    id: 11,
    name: 'No Country for Old Men',
    previewImage: 'img/no-country-for-old-men.jpg',
  },
  {
    id: 12,
    name: 'Snatch',
    previewImage: 'img/snatch.jpg',
  },
  {
    id: 13,
    name: 'Moonrise Kingdom',
    previewImage: 'img/moonrise-kingdom.jpg',
  },
  {
    id: 14,
    name: 'Seven Years in Tibet',
    previewImage: 'img/seven-years-in-tibet.jpg',
  },
  {
    id: 15,
    name: 'Midnight Special',
    previewImage: 'img/midnight-special.jpg',
  },
  {
    id: 16,
    name: 'War of the Worlds',
    previewImage: 'img/war-of-the-worlds.jpg',
  },
  {
    id: 17,
    name: 'Dardjeeling Limited',
    previewImage: 'img/dardjeeling-limited.jpg',
  },
  {
    id: 18,
    name: 'Orlando',
    previewImage: 'img/orlando.jpg',
  },
  {
    id: 19,
    name: 'Mindhunter',
    previewImage: 'img/mindhunter.jpg',
  },
  {
    id: 20,
    name: 'Midnight Special',
    previewImage: 'img/midnight-special.jpg',
  },

];

ReactDOM.render(
  <React.StrictMode>
    <App
      promo={PROMO}
      films={FILMS}
    />
  </React.StrictMode>,
  document.getElementById('root'));
