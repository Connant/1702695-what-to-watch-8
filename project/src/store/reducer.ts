import { Actions,  ActionType } from './action';
import { Film } from '../components/film-card/film-card';
import { Genres } from '../const';
import { filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilms: Film[],
  isDataLoaded: boolean,
}

const initialState: State = {
  currentGenre: Genres.All,
  currentFilms: [],
  isDataLoaded: false,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, currentFilms: filterFilmsByGenre(action.payload, state.currentGenre)};

    case ActionType.LoadFilms: {
      const adaptedFilms = action.payload;

      return {
        ...state,
        currentFilms: adaptedFilms,
        isDataLoaded: true,
      };
    }
    default:
      return state;
  }
};
