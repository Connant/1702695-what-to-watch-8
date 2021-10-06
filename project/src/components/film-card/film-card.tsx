import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';

type FilmCardProps = {
  film: {
    name: string,
    previewImage: string
  }
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  const {name, previewImage} = film;


  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
