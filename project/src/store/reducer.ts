import { Actions,  ActionType } from './action';
import { Film } from '../components/film-card/film-card';
import { Genre, AuthorizationStatus } from '../const';
import { ReviewPost } from '../components/add-review/review-form';
import { adaptFilmsToClient, adaptToClient, filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilms: Film,
  authorizationStatus: AuthorizationStatus;
  similarFilms: Film[],
  similarFilmsLoading: boolean,
  reviews: ReviewPost[],
  isReviewsLoaded: boolean,
  favoriteFilms: Film[],
  promo: Film,
}

const initialState: State = {
  currentGenre: Genre.All,
  currentFilms: {} as  Film,
  authorizationStatus: AuthorizationStatus.Unknown,
  similarFilms: [],
  similarFilmsLoading: false,
  reviews: [],
  isReviewsLoaded: false,
  favoriteFilms: [],
  promo: {} as  Film,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, favoriteFilms: adaptFilmsToClient(filterFilmsByGenre(action.payload, state.currentGenre))};

    case ActionType.LoadFilms: {
      return {...state, currentFilms: adaptToClient(action.payload), similarFilms: [], similarFilmsLoading: false};
    }

    case ActionType.LoadSimilarFilms:
      return {...state, similarFilms: action.payload, similarFilmsLoading: true};

    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};

    case ActionType.LoadReviews:
      return {...state, reviews: action.payload, isReviewsLoaded: true};

    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth, favoriteFilms: []};

    case ActionType.RemoveFavorite:
      return {...state, favoriteFilms: []};

    case ActionType.AddFavorite:
      return {...state, authorizationStatus: AuthorizationStatus.Auth, favoriteFilms: adaptFilmsToClient(action.payload)};

    case ActionType.LoadFavorite:
      return  {...state, favoriteFilms: adaptFilmsToClient(action.payload)};

    case ActionType.LoadPromo:
      return  {...state, promo: action.payload};

    case ActionType.UpdatePromo:
      return  {...state, promo: action.payload};

    case ActionType.UpdateFilm:
      return  {...state,
        currentFilms: state.currentFilms.map((el) =>
          el.id === action.payload.id ? action.payload : el),
      };

    default:
      return state;
  }
};
