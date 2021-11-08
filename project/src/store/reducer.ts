import { Actions,  ActionType } from './action';
import { Film } from '../components/film-card/film-card';
import { Genres, AuthorizationStatus } from '../const';
import { filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilms: Film[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus;
}

const initialState: State = {
  currentGenre: Genres.All,
  currentFilms: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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

    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};

    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    default:
      return state;
  }
};
