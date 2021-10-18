import FilmCard, { FilmCardProps } from '../film-card/film-card';

export type FilmsListPropsType = {
  films: FilmCardProps[]
}

export default function FilmList({ films }: FilmsListPropsType): JSX.Element {

  return (
    <div className="catalog__films-list">
      {films.map((film: FilmCardProps) => (
        <FilmCard
          {...film}
          key={film.films.id}
          film={film}
        />
      ))}
    </div>
  );
}
