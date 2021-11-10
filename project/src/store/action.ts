import { Film } from '../components/film-card/film-card';
import { AuthorizationStatus } from '../const';


export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilms>
| ReturnType<typeof loadFilms>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>

export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const filterFilms = (films: Film[]) => ({
  type: ActionType.FilterFilms,
  payload: films,
} as const);

export const loadFilms = (films: Film[]) => ({
  type: ActionType.LoadFilms,
  payload: films,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
