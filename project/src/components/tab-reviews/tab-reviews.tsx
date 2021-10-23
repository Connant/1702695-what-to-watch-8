

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

export default function TabReviews(reviews : FilmReviewProps) : JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews.user.name}</cite>
              <time className="review__date" dateTime="2016-12-24">{reviews.date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews.rating}</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews.user.name}</cite>
              <time className="review__date" dateTime="2016-12-24">{reviews.date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews.rating}</div>
        </div>
      </div>

      <div className="film-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">{reviews.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{reviews.user.name}</cite>
              <time className="review__date" dateTime="2016-12-24">{reviews.date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{reviews.rating}</div>
        </div>
      </div>
    </div>
  );
}
