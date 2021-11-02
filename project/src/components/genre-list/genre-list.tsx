import { Film } from '../film-card/film-card';
import { changeGenre } from '../../store/action';
import { State } from '../reducer/reducer';
import { Genres } from '../../const';
import { useDispatch, useSelector } from 'react-redux';


export type GenreListProps = {
  films: Film[],
}

type ConnectedGenreListProps = GenreListProps;


export default function GenreList({ films }: ConnectedGenreListProps): JSX.Element {

  const dispatch = useDispatch();
  const filmList = useSelector((state: State) => state.currentFilm);
  const currentGenre = useSelector((state: State) => state.currentGenre);
  const genres = [Genres, ...new Set(filmList.map((it) => it.genre))] as string[];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item ${genre === currentGenre && 'catalog__genres-item--active'}`}
          key={genre}
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(changeGenre(genre));
          }}
        >
          <a href="/" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

