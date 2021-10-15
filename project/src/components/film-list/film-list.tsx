import { MainProps } from '../main/main';
import FilmCard from '../film-card/film-card';

export default function FilmList(props: MainProps): JSX.Element {
  const { films } = props;
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.id} film={film} />)}
    </div>
  );
}
