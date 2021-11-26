import { changeGenre } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { Genre } from '../../const';
import { getCurrentGenre } from '../../store/selectors';
import { Film } from '../film-card/film-card';

export type GenreListProps = {
  films: Film[],
  resetGenre: () => void,
}

export default function GenreList({films, resetGenre}: GenreListProps): JSX.Element {
  const currentGenre = useSelector(getCurrentGenre);
  const dispatch = useDispatch();

  const handleChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  const genres = [Genre.All, ...new Set(films.map((film) => film.genre))];

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
              handleChangeGenre(genre);
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

