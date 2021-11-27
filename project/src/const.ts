
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

export enum Genre {
  All = 'All genres',
}

export const FILM_CARD_COUNT = 8;
export const DEFAULT_SIZE = 1;


export enum APIRoute {
  Films = '/films',
  Film = '/films/:id',
  Login = '/login',
  Logout = '/logout',
  SimilarFilms = '/films/:id/similar',
  Reviews = '/comments/:id',
  Favorites = '/favorite',
  Promo = '/promo',
  Error = '/404',
}

export enum Grade {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum Time {
  Zero = 0,
  HourInSecond = 3600,
}

export enum FavoriteFilm {
  Add = 1,
  Remove = 0,
}

