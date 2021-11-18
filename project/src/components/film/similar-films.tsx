
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilmList from '../film-list/film-list';

import { getCurrentFilm, getSimilarFilms } from '../../store/selectors';

const SIMILAR_FILMS = 4;


export default function SimilarFilms(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const { id }: {id: string} = useParams();
  const currentMovie = currentFilms.find((film) => film.id === Number(id));
  const filmId = Number(id);

  return (
    <div>
      {similarFilms.length > 0 && (
        <FilmList films={similarFilms
          .filter((film) => currentMovie?.id !== filmId)
          .slice(0, SIMILAR_FILMS)}
        />
      )}
    </div>
  );
}

