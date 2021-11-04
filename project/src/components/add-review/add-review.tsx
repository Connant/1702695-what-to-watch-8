import React from 'react';
import { useState, ChangeEvent, SyntheticEvent, Fragment } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { AppRoute } from '../../const';
import { Film } from '../film-card/film-card';


type stateForm = {
  rating: string,
  reviewText: string
}

type MatchParams = {
  id: string;
}

function AddReview({ match }: RouteComponentProps<MatchParams>): JSX.Element {

  const { id } = match.params;

  const [ stateForm, setStateForm ] = useState<stateForm>({
    rating: '',
    reviewText: '',
  });

  const currentFilm = Film[+id];

  if (!currentFilm) {
    return <Redirect to='/' />;
  }

  const handleChangeControls = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const name = evt.target.name;
    const value = evt.target.value;

    setStateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = (evt: SyntheticEvent): void => {
    evt.preventDefault();
  };

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
                <a href="film-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
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

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmitForm}>
          <div className="rating">
            <div className="rating__stars">
              { Array.from({length: 10}, (_, i) => i+1)
                .reverse()
                .map((index) => (
                  <Fragment key={index}>
                    <input
                      onChange={handleChangeControls}
                      className="rating__input"
                      id={`star-${index}`}
                      type="radio"
                      name="rating"
                      checked={index.toString() === stateForm.rating}
                      value={index}
                    />
                    <label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label>
                  </Fragment>
                ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              onChange={handleChangeControls}
              name="reviewText"
              id="review-text"
              placeholder="Review text"
              value={stateForm.reviewText}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;
