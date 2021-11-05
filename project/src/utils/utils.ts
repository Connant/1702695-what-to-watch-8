import { FilmProps, Film } from '../components/film-card/film-card';
import { Genres } from '../const';

export const adaptToClient = (film: FilmProps): Film => (
  {
    id: film['id'],
    name: film['name'],
    posterImage: film['poster_image'],
    previewImage: film['preview_image'],
    backgroundImage: film['background_image'],
    backgroundColor: film['background_color'],
    videoLink: film['video_link'],
    previewVideoLink: film['preview_video_link'],
    description: film['description'],
    rating: film['rating'],
    scoresCount: film['scores_count'],
    director: film['director'],
    starring: film['starring'],
    runTime: film['run_time'],
    genre: film['genre'],
    released: film['released'],
    isFavorite: film['is_favorite'],
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
