
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilmList from '../film-list/film-list';

import { getCurrentFilm, getSimilarFilmsLoading } from '../../store/selectors';
import { fetchSimilarFilmsAction } from '../../store/actions-api';

const SIMILAR_FILMS = 4;


export default function SimilarFilms(): JSX.Element {

  const currentFilms = useSelector(getCurrentFilm);
  const dispatch = useDispatch();


  const getSimilarFilmList = (id: number) => {
    dispatch(fetchSimilarFilmsAction(id));
  };

  const { id }: {id: string} = useParams();
  const currentMovie = currentFilms.find((film) => film.id === Number(id));
  const filmIdNum = currentMovie?.id || 0;

  useEffect(() => {
    if (!getSimilarFilmsLoading) {
      getSimilarFilmList(filmIdNum);
    }
  });

  return (
    <div>
      {
        currentFilms.length > 0 && (
          <FilmList films={currentFilms
            .filter((film) => film.id !== currentMovie?.id)
            .slice(0, SIMILAR_FILMS)}
          />
        )
      }
    </div>
  );
}

