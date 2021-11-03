import { Film } from '../film-card/film-card';
import { changeGenre } from '../../store/action';
import { State } from '../reducer/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../const';

export type GenreListProps = {
  films: Film[],
}

type ConnectedGenreListProps = GenreListProps;


export default function GenreList({ films }: ConnectedGenreListProps): JSX.Element {

  const dispatch = useDispatch();
  const filmList = useSelector((state: State) => state.currentFilm);
  const currentGenre = useSelector((state: State) => state.currentGenre);
  const genres = [Genres.All, ...new Set(filmList.map((it) => it.genre))] as string[];

  function onChangeGenre(genre:string) {
    genre === 'All genres' && dispatch(changeGenre(genre));
  }

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li className={`catalog__genres-item ${genre === currentGenre && 'catalog__genres-item--active'}`}
          key={genre}
          onClick={(evt) => {
            evt.preventDefault();
            onChangeGenre(genre);
            dispatch(changeGenre(genre));
          }}
        >
          <a href="/" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

