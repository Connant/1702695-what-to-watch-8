import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../const';
import { getCurrentFilm } from '../../store/selectors';
import { fetchFilmAction } from '../../store/actions-api';
import Loading from '../loading/loading';
import ReviewForm from './add-review-form';
import UserBlock from '../user-block/ user-block';


export default function AddReview(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const dispatch = useDispatch();
  const { id }: {id: string} = useParams();
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
          <img src={currentFilms.backgroundImage} alt={currentFilms.name} />
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
                <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)} className="breadcrumbs__link">{currentFilms.name}</Link>
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

