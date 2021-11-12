
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { State } from '../../store/reducer';
import FilmList from '../film-list/film-list';

const SIMILAR_FILMS = 4;

const mapStateToProps = ({currentFilms, similarFilms}: State) => ({
  currentFilms,
  similarFilms,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export function SimilarFilms({currentFilms, similarFilms}: PropsFromRedux): JSX.Element {

  const { id }: {id: string} = useParams();
  const currentMovie = currentFilms.find((film) => film.id === Number(id));
  const filmId = Number(id);

  return (
    <div>
      {similarFilms.length > 0 && (
        <React.Fragment>
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms
            .filter((film) => currentMovie?.id !== filmId)
            .slice(0, SIMILAR_FILMS)}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default connector(SimilarFilms);

