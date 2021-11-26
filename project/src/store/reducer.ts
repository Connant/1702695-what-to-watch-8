import { Actions,  ActionType } from './action';
import { Film, FilmProps } from '../components/film-card/film-card';
import { Genres, AuthorizationStatus } from '../const';
import { ReviewPost } from '../components/add-review/review-form';
import { adaptFilmsToClient, filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilms: Film[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus;
  similarFilms: Film[],
  similarFilmsLoading: boolean,
  reviews: ReviewPost[],
  isReviewsLoaded: boolean,
  favoriteFilms: FilmProps[],
  promo: Film,
}

const initialState: State = {
  currentGenre: Genres.All,
  currentFilms: [],
  isDataLoaded: false,
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
      return {...state, currentFilms: adaptFilmsToClient(filterFilmsByGenre(action.payload, state.currentGenre))};

    case ActionType.LoadFilms: {
      return {...state, currentFilms: adaptFilmsToClient(action.payload), similarFilms: [], similarFilmsLoading: false};
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
      return {...state, authorizationStatus: AuthorizationStatus.Auth, favoriteFilms: action.payload};

    case ActionType.LoadFavorite:
      return  {...state, favoriteFilms: action.payload};

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
