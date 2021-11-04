import { Film } from '../components/film-card/film-card';

// export enum ActionType {
// ChangeGenre = 'films/changeGenre',
// FilterFilms = 'films/filterFilms',
// }

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadFilms = 'data/loadFilms',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilms>
| ReturnType<typeof loadFilms>

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

