/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, Genres, DEFAULT_SIZE, FILM_CARD_COUNT } from '../../const';
import  { Film } from '../film-card/film-card';
import GenreList from '../genre-list/genre-list';
import FilmList from '../film-list/film-list';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/reducer';

import ShowMore from '../show-more/show-more';
import { useState } from 'react';

export type MainProps = {
  films: Film[],
}

const mapStateToProps = ({currentFilm, currentGenre}: State) => ({
  currentFilm,
  currentGenre,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMainProps = PropsFromRedux & MainProps;


function Main({films, currentFilm, currentGenre }: ConnectedMainProps): JSX.Element {

  const {
    name,
    genre,
    released,
    poster_image,
    background_image,
  } = currentFilm[0];


  const [showSize, setShowSize] = useState(DEFAULT_SIZE);

  const filmList = films.filter((film) => {
    if (currentGenre === Genres.All) {
      return true;
    }
    return film.genre === currentGenre;
  }).slice(0, showSize * FILM_CARD_COUNT);

  const shownFilms = films.slice(0, showSize * FILM_CARD_COUNT);

  const handleShowMoreClick = () => {
    setShowSize(() => showSize + 1);
  };

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={background_image} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={AppRoute.MyList} className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={poster_image} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={currentFilm} />

          <FilmList films={filmList} />

          {filmList.length === shownFilms.length && <ShowMore onClick={handleShowMoreClick}/>}

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default connector(Main);
