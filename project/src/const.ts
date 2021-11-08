
export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film= '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genres {
  All = 'All genres',
}

export const FILM_CARD_COUNT = 8;
export const DEFAULT_SIZE = 1;
export const MORE_FILMS = 4;

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}
