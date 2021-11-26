import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../loading/loading';
import { title } from 'process';
import ReviewForm from './review-form';
import UserBlock from '../user-block/ user-block';
import { getCurrentFilm } from '../../store/selectors';
import { fetchFilmAction } from '../../store/actions-api';


export default function AddReview(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const { id }: {id: string} = useParams();

  const dispatch = useDispatch();
  const filmId = Number(id);

  const getFilm = (currentFilmId: number) => {
    dispatch(fetchFilmAction(currentFilmId));
  };

  useEffect(() => {
    if (currentFilms.id !== filmId) {
      getFilm(filmId);
    }
  });

  if (!currentFilms.id) {
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
                <Link to={AppRoute.AddReview.replace(':id', id.toString())} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilms.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <ReviewForm  />

    </section>
  );
}

