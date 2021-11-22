import { Film } from '../components/film-card/film-card';
import { AuthorizationStatus } from '../const';
import { FilmReviewProps } from '../components/tabs/tab-reviews/tab-reviews';
import { createAction } from '@reduxjs/toolkit';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  FilterFilms = 'films/filterFilms',
  LoadFilms = 'data/loadFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoadSimilarFilms = 'data/loadSimilarFilms',
  LoadReviews = 'data/loadReviews',
  RedirectToRoute = 'app/redirect',
  LoadFavorite = 'user/loadFavorite',
  AddFavorite = 'user/addFavorite',
  RemoveFavorite = 'user/removeFavorite',
}

export type Actions =
| ReturnType<typeof changeGenre>
| ReturnType<typeof filterFilms>
| ReturnType<typeof loadFilms>
| ReturnType<typeof requireAuthorization>
| ReturnType<typeof requireLogout>
| ReturnType<typeof loadSimilarFilms>
| ReturnType<typeof loadReviews>
| ReturnType<typeof addFavorite>
| ReturnType<typeof removeFavorite>
| ReturnType<typeof loadFavorite>

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre,
  payload: string,
}

export const changeGenre = (genre: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

// export const changeGenre = createAction(
//   ActionType.ChangeGenre,
//   (genre: string) => ({payload: genre}),
// );

export const filterFilms = createAction(
  ActionType.FilterFilms,
  (films: Film[]) => ({payload: films}),
);

export const loadFilms = (films: Film[]) => ({
  type: ActionType.LoadFilms,
  payload: films,
} as const);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({payload: authStatus}),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const loadSimilarFilms = (films: Film[]) => ({
  type: ActionType.LoadSimilarFilms,
  payload: films,
} as const);

export const loadReviews = (reviews: FilmReviewProps[]) => ({
  type: ActionType.LoadReviews,
  payload: reviews,
} as const);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: string) => ({payload: url}),
);

export const loadFavorite = createAction(
  ActionType.LoadFavorite,
  (films: Film[]) => ({payload: films}),
);

export const addFavorite = createAction(ActionType.AddFavorite);

export const removeFavorite = createAction(ActionType.RemoveFavorite);
