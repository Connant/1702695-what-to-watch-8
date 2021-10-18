import { Link } from 'react-router-dom';

export type Film = {
  id: number,
  name: string,
  released: string,
  description: string,
  genre: string,
  rating: string,
  director: string,
  actors: string,
  runtime: string,
  videoLink: string,
  previewVideoLink: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundСolor: string,
  scoresCount: number,
  isFavorite: boolean,
  isActive: boolean,
}

export type FilmCardProps = {
  films: Film;
  onMouseEnter: (id: number) => void,
  onMouseLeave: () => void
}

function FilmCard(props: { film: FilmCardProps }): JSX.Element {
  const { films, onMouseEnter } = props.film;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onMouseEnter(films.id)}>
      <div className="small-film-card__image">
        <img src={films.posterImage} alt={films.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${films.id}`}>{films.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
