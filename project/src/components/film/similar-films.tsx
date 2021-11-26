
import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilmList from '../film-list/film-list';

import { getCurrentFilm, getSimilarFilms, getSimilarFilmsLoading } from '../../store/selectors';
import { fetchSimilarFilmsAction } from '../../store/actions-api';

const SIMILAR_FILMS = 4;


export default function SimilarFilms(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const dispatch = useDispatch();


  const getSimilarFilmList = (id: number) => {
    dispatch(fetchSimilarFilmsAction(id));
  };

  // const { id }: {id: string} = useParams();
  // const currentMovie = currentFilms.find((film) => film.id === Number(id));
  // const filmIdNum = currentMovie?.id || 0;

  useEffect(() => {
    if (!getSimilarFilmsLoading) {
      getSimilarFilmList(currentFilms.id);
    }
  });

  return (
    <div>
      {similarFilms.length > 0 && (
        <FilmList films={similarFilms
          .filter((film) => film.id !== currentFilms.id)
          .slice(0, SIMILAR_FILMS)}
        />
      )}
    </div>
  );
}

