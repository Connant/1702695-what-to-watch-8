
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilmList from '../film-list/film-list';
import { getCurrentFilm, getSimilarFilms, getSimilarFilmsLoading } from '../../store/selectors';
import { fetchSimilarFilmsAction } from '../../store/actions-api';
import Loading from '../loading/loading';


const SIMILAR_FILMS = 4;

export default function SimilarFilms(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const similarFilms = useSelector(getSimilarFilms);
  const isSimilarFilmsLoaded = useSelector(getSimilarFilmsLoading);
  const dispatch = useDispatch();

  const getSimilarFilmList = (id: number) => {
    dispatch(fetchSimilarFilmsAction(id));
  };

  useEffect(() => {
    if (!isSimilarFilmsLoaded) {
      getSimilarFilmList(currentFilms.id);
    }
  });

  if (!isSimilarFilmsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      {similarFilms.length > 0 && (
        <React.Fragment>
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms
            .filter((film) => film.id !== currentFilms.id)
            .slice(0, SIMILAR_FILMS)}
          />
        </React.Fragment>
      )}
    </div>
  );
}

