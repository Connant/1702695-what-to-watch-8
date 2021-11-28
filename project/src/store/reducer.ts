import { Actions,  ActionType } from './action';
import { Film, FilmProps } from '../components/film-card/film-card';
import { Genre, AuthorizationStatus } from '../const';
import { ReviewPost } from '../components/add-review/review-form';
import { adaptFilmsToClient, adaptToClient, filterFilmsByGenre } from '../utils/utils';

export type State = {
  currentGenre: string,
  currentFilmsProps: FilmProps[],
  currentFilms: Film[],
  currentFilm: Film,
  authorizationStatus: AuthorizationStatus;
  similarFilms: Film[],
  similarFilmsLoading: boolean,
  reviews: ReviewPost[],
  isReviewsLoaded: boolean,
  favoriteFilms: Film[],
  filterFilms: Film[],
  promo: Film,
}

const initialState: State = {
  currentGenre: Genre.All,
  currentFilmsProps: [],
  currentFilms: [],
  currentFilm: {} as  Film,
  authorizationStatus: AuthorizationStatus.Unknown,
  similarFilms: [],
  similarFilmsLoading: false,
  reviews: [],
  isReviewsLoaded: false,
  favoriteFilms: [],
  filterFilms: [],
  promo: {} as  Film,
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, filterFilms: filterFilmsByGenre(action.payload, state.currentGenre)};

    case ActionType.LoadFilms: {
      return {...state, currentFilms: adaptFilmsToClient(action.payload), similarFilmsLoading: false};
    }

    case ActionType.LoadFilm: {
      return {...state, currentFilm: adaptToClient(action.payload), similarFilmsLoading: false, isReviewsLoaded: false};
    }

    case ActionType.LoadSimilarFilms:
      return {...state, similarFilms: adaptFilmsToClient(action.payload), similarFilmsLoading: true};

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
