import { FilmProps, Film } from '../components/film-card/film-card';
import { Genre, Grade, Time } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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
  if (genre === Genre.All) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};


export const formatDate = (date: string): string => dayjs(date).format('YYYY-MM-DD');
export const formatRunTime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');
export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= Time.HourInSecond ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(format);
};
export const normalDate = (date: string): string => dayjs(date).format('MMMM D, YYYY');

export const getGrade = (rating: number): string => {
  if (rating === 10) {
    return Grade.Awesome;
  } else if (rating >= 8) {
    return Grade.VeryGood;
  } else if (rating >= 5) {
    return Grade.Good;
  } else if (rating >= 3) {
    return Grade.Normal;
  } else if (rating > 0) {
    return Grade.Bad;
  }
  return '';
};

export function getGenres (films : Film[]): string[] {
  const allGenres = ['All genres'];
  const genres = Array.from(new Set(films.map((film : Film) => film.genre)));
  return allGenres.concat(genres);
}
