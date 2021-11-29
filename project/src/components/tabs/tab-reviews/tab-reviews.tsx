import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsAction } from '../../../store/actions-api';

import { getCurrentFilm, getIsReviewsLoaded, getReviews } from '../../../store/selectors';
import { formatDate, normalDate } from '../../../utils/utils';
import Loading from '../../loading/loading';

export default function TabReviews(): JSX.Element {

  const currentFilm = useSelector(getCurrentFilm);
  const reviews = useSelector(getReviews);
  const isReviewsLoaded = useSelector(getIsReviewsLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReviewsLoaded) {
      dispatch(fetchReviewsAction(currentFilm.id));
    }
  });

  if (!isReviewsLoaded) {
    return <Loading />;
  }

  if (reviews.length === 0) {
    return <p>Oh, this movie hasnt got any reviews!</p>;
  }

  const midIndex = Math.round(reviews.length / 2);

  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">
        {reviews.slice(0, midIndex).map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={formatDate(review.date)}>{normalDate(review.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(midIndex).map((review) => (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={formatDate(review.date)}>{normalDate(review.date)}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

