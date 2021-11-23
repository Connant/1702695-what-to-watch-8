import { ReviewPost } from '../components/add-review/review-form';
import { Film } from '../components/film-card/film-card';
import { AuthorizationStatus } from '../const';
import { State } from './reducer';


export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
export const getSimilarFilms = (state: State): Film[] => state.similarFilms;
export const getReviews = (state: State): ReviewPost[] => state.reviews;
export const getCurrentFilm = (state: State): Film[] => state.currentFilms;
export const getCurrentGenre = (state: State): string => state.currentGenre;
export const getIsDataLoaded = (state: State): boolean => state.isDataLoaded;
export const getSimilarFilmsLoading = (state: State): boolean => state.similarFilmsLoading;
export const getIsReviewsLoaded = (state: State): boolean => state.isReviewsLoaded;
export const getFavoriteFilms = (state: State): Film[] => state.favoriteFilms;

