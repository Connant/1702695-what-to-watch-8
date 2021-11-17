
import { loadFilms, requireAuthorization, requireLogout } from './action';
import { APIRoute, AuthorizationStatus } from '../const';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { toast } from 'react-toastify';
import { State } from './reducer';
import { Film } from '../components/film-card/film-card';
import { Actions, loadSimilarFilms, loadReviews } from './action';
import { dropToken, saveToken, Token } from '../services/token';
import { FilmReviewProps } from '../components/tabs/tab-reviews/tab-reviews';

export type AuthorizationData = {
  login: string,
  password: string,
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const checkAuthorizationAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    // try {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Unknown));
      });
    // } catch {
    //   toast.error('Auth failed');
    // }
  };

export const loginAction = ({login: email, password}: AuthorizationData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
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
    const {data} = await api.get<FilmReviewProps[]>(APIRoute.Reviews.replace(':id', `${filmId}`));
    dispatch(loadReviews(data));
  };

export const sendReview = (filmId: number, review: FilmReviewProps ): ThunkActionResult =>
  async (dispatch, _getState, api) : Promise<void> => {
    try {
      const {data} = await api.post<FilmReviewProps[]>(APIRoute.Reviews.replace(':id', `${filmId}`), review);
      dispatch(loadReviews(data));
    } catch {
      toast.error('Sending failed');
    }
  };

