import { useState } from 'react';
import FilmCard, { FilmCardProps } from '../film-card/film-card';

export type FilmsListPropsType = {
  films: FilmCardProps[]
}

type MoviesListState = number

export default function FilmList({ films }: FilmsListPropsType): JSX.Element {

  const [activeFilm, setActiveFilm] = useState<MoviesListState>(-1);

  const handleMouseEnter = (id: number): void => {
    setActiveFilm(id);
  };

  const handleMouseLeave = (): void => {
    setActiveFilm(-1);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film: FilmCardProps) => (
        <FilmCard
          {...film}
          key={film.id}
          isActive={activeFilm === film.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
