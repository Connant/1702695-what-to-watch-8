import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, Genre, DEFAULT_SIZE, FILM_CARD_COUNT } from '../../const';
import GenreList from '../genre-list/genre-list';
import FilmList from '../film-list/film-list';
import { useSelector } from 'react-redux';
import ShowMore from '../show-more/show-more';
import { useState } from 'react';
import Loading from '../loading/loading';
import UserBlock from '../user-block/ user-block';
import { useHistory } from 'react-router';

import { getCurrentFilms, getFilterFilms } from '../../store/selectors';
import MyListButton from '../my-list/my-list-button';

export type MainProps = {
  currentGenre: string,
}

export default function Main({currentGenre}: MainProps): JSX.Element {
  const currentFilms = useSelector(getCurrentFilms);
  const filterFilms = useSelector(getFilterFilms);

  const [showSize, setShowSize] = useState(DEFAULT_SIZE);
  const history = useHistory();

  const filmList = filterFilms.filter((film) => {
    if (currentGenre === Genre.All) {
      return true;
    }
    return film.genre === currentGenre;
  }).slice(0, showSize * FILM_CARD_COUNT);

  const shownFilms = filmList.slice(0, showSize * FILM_CARD_COUNT);

  const handleShowMoreClick = () => {
    setShowSize(() => showSize + 1);
  };

  if(!currentFilms.length) {
    return <Loading />;
  }

  const {
    id,
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
  } = currentFilms[0];

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${id}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <MyListButton film={currentFilms[0]} />

              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList resetGenre={() => setShowSize(DEFAULT_SIZE)} />

          {currentFilms.length !== 0 ? <FilmList films={filmList} /> : <Loading />}

          {filterFilms.length > shownFilms.length && <ShowMore onClick={handleShowMoreClick}/>}

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

