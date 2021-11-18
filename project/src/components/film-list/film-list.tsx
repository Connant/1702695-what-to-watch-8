import { memo } from 'react';
import FilmCard, { Film } from '../film-card/film-card';

export type FilmsListPropsType = {
  films: Film[];
}


function FilmList({ films }: FilmsListPropsType): JSX.Element {

  return (
    <div className="catalog__films-list">
      {films.map((film: Film) => (
        <FilmCard
          {...film}
          key={film.id}
          films={film}
        />
      ))}
    </div>
  );
}

export default memo(FilmList);
