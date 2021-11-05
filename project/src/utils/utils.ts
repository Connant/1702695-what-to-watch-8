/* eslint-disable camelcase */
import { FilmProps, Film } from '../components/film-card/film-card';
import { Genres } from '../const';

export const adaptToClient = (film: FilmProps): Film => (
  {
    id: film['id'],
    name: film['name'],
    poster_image: film['posterImage'],
    preview_image: film['previewImage'],
    background_image: film['backgroundImage'],
    background_color: film['backgroundColor'],
    video_link: film['videoLink'],
    preview_video_link: film['previewVideoLink'],
    description: film['description'],
    rating: film['rating'],
    scores_count: film['scoresCount'],
    director: film['director'],
    starring: film['starring'],
    run_time: film['runTime'],
    genre: film['genre'],
    released: film['released'],
    is_favorite: film['isFavorite'],
  }
);

export const adaptFilmsToClient = (films: FilmProps[]): Film[] => (
  films.map((film) => adaptToClient(film))
);

export const filterFilmsByGenre = (films: Film[], genre: string): Film[] => {
  if (genre === Genres.All) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
