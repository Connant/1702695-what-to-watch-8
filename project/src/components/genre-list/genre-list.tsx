import { Film } from '../film-card/film-card';
import { changeGenre } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../const';
import { getCurrentFilm, getCurrentGenre } from '../../store/selectors';

export type GenreListProps = {
  films: Film[],
  resetGenre: () => void,
}

export default function GenreList({films, resetGenre}: GenreListProps): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const currentGenre = useSelector(getCurrentGenre);
  const dispatch = useDispatch();

  const onChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  const genres = [Genres.All, ...new Set(currentFilms.map((it) => it.genre))] as string[];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
        >
          <a
            href="/"
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

