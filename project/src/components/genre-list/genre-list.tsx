import { Film } from '../film-card/film-card';
import { changeGenre, filterFilms } from '../../store/action';
// import { State } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Genres } from '../../const';
import { getCurrentGenre } from '../../store/selectors';

export type GenreListProps = {
  films: Film[],
  resetGenre: () => void,
}

type ConnectedGenreListProps = GenreListProps;

export default function GenreList({films, resetGenre}: ConnectedGenreListProps): JSX.Element {

  const currentGenre = useSelector(getCurrentGenre);
  const dispatch = useDispatch();

  // const onChangeGenre = (genre: string) => {
  //   dispatch(changeGenre(genre));
  // };

  function onChangeGenre(genre:string) {
    genre === 'All genres' && dispatch(changeGenre(genre));
  }

  const onFilterFilms = (filmList: Film[]) => {
    dispatch(filterFilms(filmList));
  };


  const genres = [Genres.All, ...new Set(films.map((film) => film.genre))];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}>
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

