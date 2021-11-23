import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useState } from 'react';
import { setFavoriteAction } from '../../store/actions-api';
import { getAuthorizationStatus, getCurrentFilm } from '../../store/selectors';
import { AppRoute, AuthorizationStatus, FavoriteFilms } from '../../const';
import { Redirect, useParams } from 'react-router-dom';
import React from 'react';


function MyListButton(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const { id }: {id: string} = useParams();
  const currentMovie = currentFilms.find((film) => film.id === Number(id));
  const filmIdNum = currentMovie?.id || 0;

  const [isInFavoriteList, setIsInFavoriteList] = useState(currentMovie?.is_favorite);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  useEffect(() => setIsInFavoriteList(currentMovie?.is_favorite), [currentMovie]);

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(<Redirect to={AppRoute.SignIn} />);
      setIsInFavoriteList(!isInFavoriteList);
      return;
    }
    dispatch(setFavoriteAction(filmIdNum, isInFavoriteList ? FavoriteFilms.Remove : FavoriteFilms.Add));
  };


  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleFavoriteClick}>
      {!currentMovie?.is_favorite &&
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"/>
          </svg>}
      {(authorizationStatus === AuthorizationStatus.Auth && currentMovie?.is_favorite) &&
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>}
      <span>My list</span>
    </button>
  );
}


export default memo(MyListButton);
