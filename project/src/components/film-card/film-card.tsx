import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { AppRoute } from '../../const';

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

const TIME = 1000;

const VIDEO_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function FilmCard({films}: {films: Film}): JSX.Element {

  const timer = useRef<NodeJS.Timeout | null>(null);
  const [ isHovered, setHovered ] = useState(false);
  const [ isDelayedHovered, setDelayedHovered ] = useState(false);

  const history = useHistory();

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    clearTimer();
    if (!isHovered) {
      if (isDelayedHovered) {
        setDelayedHovered(false);
      }
      return;
    }
    timer.current = setTimeout(() => {
      if (!isHovered) {
        if (isDelayedHovered) {
          setDelayedHovered(false);
        }
        return;
      }
      setDelayedHovered(true);
    }, TIME);
    return clearTimer;
  }, [isHovered]);

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} onClick={() => history.push(AppRoute.Film)}
    >
      {
        isDelayedHovered ?
          <div style={VIDEO_STYLES}>
            <video src={films.previewVideoLink} autoPlay muted poster={films.previewImage} width="280" height="175" style={{objectFit: 'cover'}} />
          </div> :
          <div className="small-film-card__image">
            <img src={films.posterImage} alt={films.name} width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${films.id}`}>{films.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
