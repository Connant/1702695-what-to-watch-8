/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Film } from '../film-card/film-card';
import TabReviews, { FilmReviewProps } from '../tabs/tab-reviews/tab-reviews';
import { fetchFilmsAction } from '../../store/actions-api';
import SimilarFilms from './similar-films';

import TabDetails from '../tabs/tab-details/tab-details';
import TabOverview from '../tabs/tab-overview/tab-overview';
import Loading from '../loading/loading';
import Error from '../error/error';
import UserBlock from '../user-block/ user-block';

import { getAuthorizationStatus, getCurrentFilm, getReviews, getSimilarFilms, getSimilarFilmsLoading } from '../../store/selectors';

export type FilmOverviewProps = {
  films: Film[],
  reviews: FilmReviewProps[],
  id: number,
}


export default function FilmPage(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const reviews = useSelector(getReviews);
  const similarFilms = useSelector(getSimilarFilms);
  const similarFilmsLoading = useSelector(getSimilarFilmsLoading);
  const dispatch = useDispatch();

  const getFilm = (currentFilmId: number) => {
    dispatch(fetchFilmsAction());
  };

  const { id }: {id: string} = useParams();
  const filmId = Number(id);
  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  useEffect(() => {
    if (currentMovie?.id !== filmId) {
      getFilm(filmId);
    }
  });

  const history = useHistory();


  const [activeTab, setActiveTab] = useState('Overview');

  if (!currentMovie) {
    return <Error />;
  }

  if (currentMovie?.id !== filmId) {
    return (
      <Loading />
    );
  }

  const {
    name,
    background_image,
    genre,
    released,
    poster_image,
  } = currentMovie as Film;

  const renderActiveTab = (tab: string) => {
    switch (tab) {
      case 'Overview':
        return <TabOverview film={currentMovie as Film} />;
      case 'Details':
        return <TabDetails film={currentMovie as Film} />;
      case 'Reviews':
        return <TabReviews reviews={reviews}/>;
    }
  };

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
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

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${filmId}`))}
                >
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
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link className="btn film-card__button" to={AppRoute.AddReview.replace(':id', `${filmId}`)}>
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={poster_image} alt={`${name} poster`} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${activeTab==='Overview' ? 'film-nav__item--active' : ''}`}>
                    <Link
                      className="film-nav__link"
                      to={`/films/${filmId}/#overview`}
                      onClick={(elem) => setActiveTab(elem.currentTarget.text)}
                    >Overview
                    </Link>
                  </li>
                  <li className={`film-nav__item ${activeTab==='Details' ? 'film-nav__item--active' : ''}`}>
                    <Link
                      className="film-nav__link"
                      to={`/films/${filmId}/#details`}
                      onClick={(elem) => setActiveTab(elem.currentTarget.text)}
                    >Details
                    </Link>
                  </li>
                  <li className={`film-nav__item ${activeTab==='Reviews' ? 'film-nav__item--active' : ''}`}>
                    <Link
                      className="film-nav__link"
                      to={`/films/${filmId}/#reviews`}
                      onClick={(elem) => setActiveTab(elem.currentTarget.text)}
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>
              {renderActiveTab(activeTab)}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">{similarFilms.length > 0 && 'More like this'}</h2>

          {similarFilmsLoading ? (<SimilarFilms />) : (<Loading />)}

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


