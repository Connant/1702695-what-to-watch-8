import { Actions,  ActionType } from './action';
import { Film } from '../components/film-card/film-card';
import { Genres } from '../const';
import { filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilm: Film[],
  isDataLoaded: boolean,
}

const initialState: State = {
  currentGenre: Genres.All,
  currentFilm: [],
  isDataLoaded: false,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, currentFilm: filterFilmsByGenre(action.payload, state.currentGenre)};

    case ActionType.LoadFilms: {
      const adaptedFilms = action.payload;

      // eslint-disable-next-line no-console
      // console.log(action.payload);

      return {
        ...state,
        currentFilm: adaptedFilms,
        isDataLoaded: true,
      };
    }
    default:
      return state;
  }
};
