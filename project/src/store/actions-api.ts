import { addFavorite, loadFavorite, loadPromo, redirectToRoute, removeFavorite, requireAuthorization, requireLogout, updatePromo, updateFilm, loadFilms, loadFilm, filterFilms } from './action';
import { APIRoute, AppRoute, AuthorizationStatus, FavoriteFilm, ToastMessage } from '../const';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { State } from './reducer';
import { Film, FilmProps } from '../components/film-card/film-card';
import { loadSimilarFilms, loadReviews } from './action';
import { dropToken, saveToken, Token } from '../services/token';
import { ReviewPost, ReviewRC } from '../components/add-review/review-form';
import { Action } from 'redux';
import { adaptFilmsToClient } from '../utils/utils';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type AuthorizationData = {
  login: string,
  password: string,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmProps[]>(APIRoute.Films);
      dispatch(loadFilms(data));
      dispatch(filterFilms(adaptFilmsToClient(data)));
      // toast.error(ToastMessage.Data);
    }
    catch {
      toast.error(ToastMessage.Data);
    }
  };

export const fetchFilmAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmProps>(APIRoute.Film.replace(':id', `${filmId}`));
      dispatch(loadFilm(data));
      // toast.error(ToastMessage.Film);
    } catch {
      dispatch(redirectToRoute(APIRoute.Error));
      toast.error(ToastMessage.Film);
    }
  };

export const checkAuthorizationAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(APIRoute.Login);
      if ( data !== undefined) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        // toast.info(ToastMessage.Auth);
      } else {
        dispatch(requireLogout());
        // toast.info(ToastMessage.Auth);
      }
    } catch {
      toast.info(ToastMessage.Auth);
    }
  }
);

export const loginAction = ({login: email, password}: AuthorizationData): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      // toast.info(ToastMessage.IncorrectEmail);
    } catch {
      toast.info(ToastMessage.IncorrectEmail);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const fetchSimilarFilmsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<FilmProps[]>(APIRoute.SimilarFilms.replace(':id', `${filmId}`));
      dispatch(loadSimilarFilms(data));
      // toast.error(ToastMessage.Data);
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const fetchReviewsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<ReviewPost[]>(APIRoute.Reviews.replace(':id', `${filmId}`));
      dispatch(loadReviews(data));
      // toast.error(ToastMessage.Data);
    } catch {
      toast.error(ToastMessage.Data);
    }
  };

export const sendReview = (filmId: number, review: ReviewRC ): ThunkActionResult =>
  async (dispatch, _getState, api) : Promise<void> => {
    try {
      const {data} = await api.post<ReviewPost[]>(APIRoute.Reviews.replace(':id', `${filmId}`), review);
      dispatch(loadReviews(data));
      dispatch(redirectToRoute(AppRoute.Film.replace(':id', `${filmId}/#Overview`)));
      // toast.error(ToastMessage.Review);
    } catch {
      toast.error(ToastMessage.Review);
    }
  };

export const fetchFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void>  => {
    const {data} = await api.get<FilmProps[]>(APIRoute.Favorites);
    dispatch(loadFavorite(data));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromo(data));
  };

export const setFavoriteAction = (filmId: number, action: FavoriteFilm): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      await api.post<Film>(`${APIRoute.Favorites}/${filmId}/${action}`);
      const {data} = await api.get<FilmProps[]>(APIRoute.Favorites);
      const curFilm = getState().currentFilms.find((el) => el.id === filmId);
      // toast.info(ToastMessage.Auth);

      dispatch(updatePromo({...getState().promo, isFavorite: !getState().promo.isFavorite}));

      if (curFilm) {
        dispatch(updateFilm({...curFilm, isFavorite: !curFilm.isFavorite}));
      }

      if (action === FavoriteFilm.Add) {
        dispatch(addFavorite(data));
      }
      if (action === FavoriteFilm.Remove) {
        dispatch(removeFavorite());
      }
    } catch {
      toast.info(ToastMessage.Auth);
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  };
