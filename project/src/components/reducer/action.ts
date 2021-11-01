import { Film } from '../film-card/film-card';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export type FilterFilmsAction = {
  type: ActionType.FilterFilms,
  payload: Film[],
}

export type Actions = ChangeGenreAction | FilterFilmsAction;
