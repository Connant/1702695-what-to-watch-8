import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { setFavoriteAction } from '../../store/actions-api';
import { getAuthorizationStatus } from '../../store/selectors';
import { AppRoute, AuthorizationStatus, FavoriteFilms } from '../../const';
import { useHistory } from 'react-router-dom';
import { Film } from '../film-card/film-card';


function MyListButton({film}: {film: Film}): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [isInFavoriteList, setIsInFavoriteList] = useState(film.isFavorite);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => setIsInFavoriteList(film.isFavorite), [film, film.isFavorite]);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsInFavoriteList(!isInFavoriteList);
      dispatch(setFavoriteAction(film.id, isInFavoriteList ? FavoriteFilms.Remove : FavoriteFilms.Add));
    } else {
      history.push(AppRoute.SignIn);
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isInFavoriteList ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}


export default memo(MyListButton);
