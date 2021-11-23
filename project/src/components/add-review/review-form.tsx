import React from 'react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { sendReview } from '../../store/actions-api';
import { getCurrentFilm } from '../../store/selectors';

export type ReviewPost = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  date: string,
  rating: number,
  comment: string,
}

export type ReviewRC = {
  rating: number,
  comment: string,
}

const DEFAULT_RATING = 0;
const MAX_RATING = 10;
const MIN_LENGTH = 50;
const MAX_LENGTH = 400;


export default function ReviewForm(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const [userInput, setUserInput] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();


  const sendComment = (id: number, data: ReviewRC) => dispatch(sendReview(id, data));

  useEffect(() => {
    const isRatingValid = rating > DEFAULT_RATING;
    const isTextAreaValid = userInput.length >= MIN_LENGTH && userInput.length <= MAX_LENGTH;
    setIsFormValid(isRatingValid && isTextAreaValid);
  }, [rating, userInput]);


  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.currentTarget.value);
  };

  const { id }: {id: string} = useParams();
  const filmId = Number(id);
  const currentMovie = currentFilms.find((film) => film.id === Number(id));
  const filmIdNum = currentMovie?.id || 0;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const postData = {
      rating: rating,
      comment: userInput,
    };

    setIsFormSending(true);
    sendComment(filmIdNum, postData);
    history.push(AppRoute.Film.replace(':id', `${filmId}`));
  };


  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              new Array(10).fill(null).map((_, index) => {
                const ratingValue = MAX_RATING - index;

                return (
                  <React.Fragment key={ratingValue}>
                    <input className="rating__input" id={`star-${ratingValue}`} type="radio" name="rating"
                      value={`${ratingValue}`} disabled={isFormSending} onChange={handleRatingChange}
                    />
                    <label className="rating__label" htmlFor={`star-${ratingValue}`}>
                      Rating {ratingValue}
                    </label>
                  </React.Fragment>
                );
              })
            }
          </div>
        </div>
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
            value={userInput} disabled={isFormSending} onChange={(evt) => setUserInput(evt.currentTarget.value)}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isFormSending || !isFormValid}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

