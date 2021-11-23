import React from 'react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendReview } from '../../store/actions-api';

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

const DEFAULT_RATING = 0;
const MAX_RATING = 10;
const MIN_LENGTH = 50;
const MAX_LENGTH = 400;


export default function ReviewForm(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isRatingValid = rating > DEFAULT_RATING;
    const isTextAreaValid = userInput.length >= MIN_LENGTH && userInput.length <= MAX_LENGTH;
    setIsFormValid(isRatingValid && isTextAreaValid);
  }, [rating, userInput]);


  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(+evt.currentTarget.value);
  };


  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setIsFormSending(true);
    dispatch(sendReview);
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

