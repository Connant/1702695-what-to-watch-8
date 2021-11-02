import { Film } from '../film-card/film-card';
import { changeGenre, filterFilms } from '../../store/action';
import { Actions } from '../reducer/action';
import { State } from '../reducer/reducer';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Genres } from '../../const';
// import { useDispatch, useSelector } from 'react-redux';


export type GenreListProps = {
  films: Film[],
}

const mapStateToProps = ({currentGenre}: State) => ({
  currentGenre,
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


function GenreList({films, onChangeGenre, onFilterFilms, currentGenre }: ConnectedGenreListProps): JSX.Element {

  // const dispatch = useDispatch();
  // const filmList = useSelector((state: State) => state.currentFilm);
  // const currentGenre = useSelector((state: State) => state.currentGenre);
  // const genres = [Genres, ...new Set(filmList.map((it) => it.genre))] as string[];

  const genres = [
    Genres.All,
    ...new Set(films.map((film) => film.genre)),
  ];

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre}
          className={`catalog__genres-item ${currentGenre === genre && 'catalog__genres-item--active'}`}
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

export default connector(GenreList);
