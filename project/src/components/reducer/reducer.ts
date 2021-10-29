import { fakeFilms } from '../../mocks/films';
import { Actions,  ActionType } from './action';
import { Film } from '../film-card/film-card';
import { Genres } from '../../const';

export type State = {
  genre: string,
  filmList: Film[],
}

const initialState: State = {
  genre: Genres.All,
  filmList: fakeFilms,
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
      return {...state, genre: action.payload};

    case ActionType.FilterFilms:
      return {...state, filmList: filterFilmsByGenre(action.payload, state.genre)};

    default:
      return state;
  }
};
