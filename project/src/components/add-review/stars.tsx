import { ChangeEventHandler, Fragment, memo } from 'react';

const MAX_RATING = 10;

export type StarsProps = {
  onChange: ChangeEventHandler<HTMLInputElement>,
  isDisabled: boolean,
}

function Stars({onChange, isDisabled}: StarsProps): JSX.Element {
  return (
    <div className="rating__stars">
      {
        new Array(10).fill(null).map((_, index) => {
          const ratingValue = MAX_RATING - index;

          return (
            <Fragment key={ratingValue}>
              <input
                className="rating__input"
                id={`star-${ratingValue}`}
                type="radio"
                name="rating"
                value={`${ratingValue}`}
                disabled={isDisabled}
                onChange={onChange}
              />
              <label
                className="rating__label"
                htmlFor={`star-${ratingValue}`}
              >
                Rating {ratingValue}
              </label>
            </Fragment>
          );
        })
      }
    </div>
  );
}

export default memo(Stars);
