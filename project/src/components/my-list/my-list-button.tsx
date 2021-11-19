import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { setFavoriteAction } from '../../store/actions-api';
import { getAuthorizationStatus, getCurrentFilm } from '../../store/selectors';
import { AppRoute, AuthorizationStatus, FavoriteFilms } from '../../const';
import { useParams } from 'react-router-dom';


export default function MyListButton(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const { id }: {id: string} = useParams();
  const filmId = Number(id);
  const currentMovie = currentFilms.find((films) => films.id === Number(id));

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const [isInFavoriteList, setIsInFavoriteList] = useState(currentMovie?.is_favorite);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => setIsInFavoriteList(currentMovie?.is_favorite), [currentMovie]);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(setFavoriteAction(filmId, isInFavoriteList ? FavoriteFilms.Remove : FavoriteFilms.Add));
      setIsInFavoriteList(!isInFavoriteList);
    } else {
      history.push(AppRoute.SignIn);
    }
  };

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
