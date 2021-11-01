import { ActionType, ChangeGenreAction, FilterFilmsAction } from '../components/reducer/action';
import { Film } from '../components/film-card/film-card';

export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const filterFilms = (films: Film[]): FilterFilmsAction => ({
  type: ActionType.FilterFilms,
  payload: films,
});
