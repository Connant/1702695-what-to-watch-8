import { Link } from 'react-router-dom';

export type FilmCardProps = {
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
}

function FilmCard(props: { film: FilmCardProps }): JSX.Element {
  const { id, name, posterImage } = props.film;


  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
