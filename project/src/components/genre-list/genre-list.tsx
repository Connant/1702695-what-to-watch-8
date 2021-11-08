import { Film } from '../film-card/film-card';
import { changeGenre } from '../../store/action';
import { State } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../const';

export type GenreListProps = {
  films: Film[],
  resetGenre: () => void,
}

type ConnectedGenreListProps = GenreListProps;


export default function GenreList({ films, resetGenre }: ConnectedGenreListProps): JSX.Element {

  const dispatch = useDispatch();
  const filmList = useSelector((state: State) => state.currentFilms);
  const currentGenre = useSelector((state: State) => state.currentGenre);
  const genres = [Genres.All, ...new Set(filmList.map((it) => it.genre))] as string[];

  function onChangeGenre(genre:string) {
    genre === 'All genres' && dispatch(changeGenre(genre));
  }

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === currentGenre && 'catalog__genres-item--active'}`}>
          <a href="/"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre);
              dispatch(changeGenre(genre));
              resetGenre();
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

