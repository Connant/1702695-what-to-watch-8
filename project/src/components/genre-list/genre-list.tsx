import { Film } from '../film-card/film-card';
import { changeGenre, filterFilms } from '../../store/action';
import { State } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../const';
import { getCurrentGenre } from '../../store/selectors';

export type GenreListProps = {
  films: Film[],
  resetGenre: () => void,
}


export default function GenreList({films, resetGenre}: GenreListProps): JSX.Element {

  const onChangeGenre = (genre: string) => {
    dispatch(changeGenre(genre));
  };

  const onFilterFilms = (filmList: Film[]) => {
    dispatch(filterFilms(filmList));
  };

  const currentGenre = useSelector(getCurrentGenre);
  const dispatch = useDispatch();
  const filmList = useSelector((state: State) => state.currentFilms);
  const genres = [Genres.All, ...new Set(filmList.map((it) => it.genre))] as string[];

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
              onFilterFilms(films);
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

