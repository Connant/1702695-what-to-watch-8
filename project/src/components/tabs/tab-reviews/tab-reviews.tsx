import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchReviewsAction } from '../../../store/actions-api';

import { getCurrentFilm, getIsReviewsLoaded, getReviews } from '../../../store/selectors';
import Loading from '../../loading/loading';

export type FilmReviewProps = {
    id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string,
}

export default function TabReviews(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const reviews = useSelector(getReviews);
  const isReviewsLoaded = useSelector(getIsReviewsLoaded);
  const dispatch = useDispatch();

  const getReviewList = (id: number) => {
    dispatch(fetchReviewsAction(id));
  };

  const { id }: {id: string} = useParams();
  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  const filmIdNum = currentMovie?.id || 0;

  useEffect(() => {
    if (!isReviewsLoaded) {
      getReviewList(filmIdNum);
    }
  });

  if (!isReviewsLoaded) {
    return <Loading />;
  }

  const splitArr = Math.round(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">
        {reviews.slice(0, splitArr).map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{review.date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(splitArr).map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{review.date}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

