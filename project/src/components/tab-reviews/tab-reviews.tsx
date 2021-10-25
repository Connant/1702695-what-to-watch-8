import React from 'react';

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

export default function TabReviews({reviews}: {reviews: FilmReviewProps[]}): JSX.Element {

  return (
    <React.Fragment>
      {reviews.map((review) => (
        <div key={review.id} className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>

            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          </div>

          <div className="film-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{review.rating}</div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
