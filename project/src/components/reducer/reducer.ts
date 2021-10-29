import { fakeFilms } from '../../mocks/films';
import { Actions,  ActionType } from './action';
import { Film } from '../film-card/film-card';
import { Genres } from '../../const';

export type State = {
  currentGenre: string,
  currentFilm: Film[],
}

const initialState: State = {
  currentGenre: Genres.All,
  currentFilm: fakeFilms,
};

const filterFilmsByGenre = (films: Film[], genre: string): Film[] => {
  if (genre === Genres.All) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};


export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, currentFilm: filterFilmsByGenre(action.payload, state.currentGenre)};

    default:
      return state;
  }
};
