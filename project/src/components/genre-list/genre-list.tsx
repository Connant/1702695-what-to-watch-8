import { Film } from '../film-card/film-card';
import { Genres } from '../../const';
import { changeGenre, filterFilms } from '../../store/action';
import { Actions } from '../reducer/action';
import { State } from '../reducer/reducer';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';


export type GenreListProps = {
  films: Film[],
}

const mapStateToProps = ({genre}: State) => ({
  genre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(changeGenre(genre));
  },
  onFilterFilms(films: Film[]) {
    dispatch(filterFilms(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedGenreListProps = PropsFromRedux & GenreListProps;

export default function GenreList({films, onChangeGenre, onFilterFilms, genre}: ConnectedGenreListProps): JSX.Element {

  const genres = [
    Genres.All,
    ...new Set(films.map((film) => film.genre)),
  ];

  return (
    <ul className="catalog__genres-list">
      <li className="catalog__genres-item catalog__genres-item--active">
        <a href="/" className="catalog__genres-link">All genres</a>
      </li>

      {genres.map((genre) => (
        <li key={genre}
          className={`catalog__genres-item ${genre === genre && 'catalog__genres-item--active'}`}
        >
          <a href="/" className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre);
              onFilterFilms(films);
            }}
          >
            {genre}
          </a>
        </li>
      ))}

    </ul>
  );
}
