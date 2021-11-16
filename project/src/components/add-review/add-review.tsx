import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppRoute } from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../store/reducer';

import Loading from '../loading/loading';
import { fetchFilmsAction, ThunkAppDispatch } from '../../store/actions-api';
import { title } from 'process';
import ReviewForm from './review-form';


const mapStateToProps = ({currentFilms}: State) => ({
  currentFilms,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  getCurrentFilm(id: number) {
    dispatch(fetchFilmsAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedFilmProps = PropsFromRedux;

function AddReview({currentFilms, getCurrentFilm}: ConnectedFilmProps): JSX.Element {

  const { id }: {id: string} = useParams();
  const filmId = Number(id);

  // eslint-disable-next-line no-console
  console.log(currentFilms);

  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  if (!currentMovie?.id) {
    getCurrentFilm(filmId);
    return <Loading />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a href="/" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

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

        <div className="film-card__poster film-card__poster--small">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <ReviewForm />

    </section>
  );
}

export default connector(AddReview);
