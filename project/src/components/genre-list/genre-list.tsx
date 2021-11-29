import { changeGenre, filterFilms } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { Genre } from '../../const';
import { getCurrentGenre, getCurrentFilms } from '../../store/selectors';
import { Film } from '../film-card/film-card';

export type GenreListProps = {
  resetGenre: () => void,
}

export default function GenreList({resetGenre}: GenreListProps): JSX.Element {
  const currentGenre = useSelector(getCurrentGenre);
  const currentFilms = useSelector(getCurrentFilms);

  const dispatch = useDispatch();

  const genres = [Genre.All, ...new Set(currentFilms.map((film) => film.genre))];

  const onFilterFilms = (filmList: Film[]) => {
    dispatch(filterFilms(filmList));
  };

  const handleChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(filterFilms(currentFilms));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
        >
          <a
            href="/" className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              handleChangeGenre(genre);
              onFilterFilms(currentFilms);
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

