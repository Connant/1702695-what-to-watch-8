import { addFavorite, loadFavorite, loadFilms, loadPromo, redirectToRoute, removeFavorite, requireAuthorization, requireLogout, updatePromo } from './action';
import { APIRoute, AppRoute, AuthorizationStatus, FavoriteFilms } from '../const';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './reducer';
import { Film } from '../components/film-card/film-card';
import { Actions, loadSimilarFilms, loadReviews } from './action';
import { dropToken, saveToken, Token } from '../services/token';
import { ReviewPost, ReviewRC } from '../components/add-review/review-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type AuthorizationData = {
  login: string,
  password: string,
}

export type AuthInfo = {
  token: Token,
}
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const checkAuthorizationAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get(APIRoute.Login);
      if ( data !== undefined) {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } else {
        dispatch(requireLogout());
      }
    } catch {
      toast.warn('Please, don\'t forget to log in');
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
    } catch {
      toast.error('Please enter valid email', {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(redirectToRoute(AppRoute.SignIn));
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
    const {data} = await api.get<Film[]>(APIRoute.SimilarFilms.replace(':id', `${filmId}`));
    dispatch(loadSimilarFilms(data));
  };

export const fetchReviewsAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ReviewPost[]>(APIRoute.Reviews.replace(':id', `${filmId}`));
    dispatch(loadReviews(data));
  };

export const sendReview = (filmId: number, review: ReviewRC ): ThunkActionResult =>
  async (dispatch, _getState, api) : Promise<void> => {
    try {
      const {data} = await api.post<ReviewPost[]>(APIRoute.Reviews.replace(':id', `${filmId}`), review);
      dispatch(loadReviews(data));
    } catch {
      toast.error('Sending failed');
    }
  };

export const fetchFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void>  => {
    const {data} = await api.get<Film[]>(APIRoute.Favorites);
    dispatch(loadFavorite(data));
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromo(data));
  };

export const setFavoriteAction = (filmId: number, action: FavoriteFilms): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Favorites);
    await api.post<Film>(`${APIRoute.Favorites}/${filmId}/${action}`);

    if (getState().promo.id === filmId) {
      dispatch(updatePromo(data));
    }

    if (action === FavoriteFilms.Add) {
      dispatch(addFavorite(data));
    }
    if (action === FavoriteFilms.Remove) {
      dispatch(removeFavorite());
    }
  };
