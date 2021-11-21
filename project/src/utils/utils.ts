/* eslint-disable camelcase */
import { FilmProps, Film } from '../components/film-card/film-card';
import { Genres, Grade, Time } from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export const formatDate = (date: string): string => dayjs(date).format('YYYY-MM-DD');
export const formatRunTime = (runtime: number): string => dayjs.duration(runtime, 'minutes').format('H[h] mm[m]');
export const formatRemainingTime = (remainingTime: number): string => {
  const format = remainingTime >= Time.HourInSecond ? '-HH:mm:ss' : '-mm:ss';
  return dayjs.duration(remainingTime, 'seconds').format(format);
};
export const dateFormat = (date: string): string => dayjs(date).format('MMMM D, YYYY');

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

