import { ChangeEventHandler } from 'react';
import { Actions,  ActionType } from './action';
import { Film } from '../components/film-card/film-card';
import { Genres, AuthorizationStatus } from '../const';
import { filterFilmsByGenre } from '../utils/utils';
import { FilmReviewProps } from '../components/tabs/tab-reviews/tab-reviews';

export type State = {
  currentGenre: string,
  currentFilms: Film[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus;
  similarFilms: Film[],
  similarFilmsLoading: boolean,
  reviews: FilmReviewProps[],
  isReviewsLoaded: boolean,
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
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, currentGenre: action.payload};

    case ActionType.FilterFilms:
      return {...state, currentFilms: filterFilmsByGenre(action.payload, state.currentGenre)};

    case ActionType.LoadFilms: {
      return {...state, currentFilms: action.payload, similarFilms: [], similarFilmsLoading: false};
    }

    case ActionType.LoadSimilarFilms:
      return {...state, similarFilms: action.payload, similarFilmsLoading: true};

    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};

    case ActionType.LoadReviews:
      return {...state, reviews: action.payload, isReviewsLoaded: true};

    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};

    default:
      return state;
  }
};
