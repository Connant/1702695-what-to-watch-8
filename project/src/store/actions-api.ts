
import { loadFilms } from './action';
import { APIRoute } from '../const';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './reducer';
import { Film } from '../components/film-card/film-card';
import type { Actions } from './action';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };
