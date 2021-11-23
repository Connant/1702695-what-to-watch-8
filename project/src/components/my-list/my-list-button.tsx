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

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      <Redirect to={AppRoute.SignIn} />;
      // setIsInFavoriteList(!isInFavoriteList);
    }
    dispatch(setFavoriteAction(filmIdNum, isInFavoriteList ? FavoriteFilms.Remove : FavoriteFilms.Add));
  };

  // const [isInFavoriteList, setIsInFavoriteList] = useState(film.isFavorite);
  // const authorizationStatus = useSelector(getAuthorizationStatus);
  // const dispatch = useDispatch();

  // useEffect(() => setIsInFavoriteList(film.isFavorite), [film]);

  // const handleFavoriteClick = () => {
  //   if (authorizationStatus === AuthorizationStatus.Auth) {
  //     setIsInFavoriteList(!isInFavoriteList);
  //   }
  //   dispatch(setFavoriteAction(filmIdNum, isInFavoriteList ? FavoriteFilms.Remove : FavoriteFilms.Add));
  // };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isInFavoriteList ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
    </button>
  );
}


export default memo(MyListButton);
