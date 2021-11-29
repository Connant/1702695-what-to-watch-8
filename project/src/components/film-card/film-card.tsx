import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef, memo } from 'react';
import { AppRoute } from '../../const';

export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type FilmProps = {
  'id': number,
  'name': string,
  'poster_image': string,
  'preview_image': string,
  'background_image': string,
  'background_color': string,
  'video_link': string,
  'preview_video_link': string,
  'description': string,
  'rating': number,
  'scores_count': number,
  'director': string,
  'starring': string[],
  'run_time': number,
  'genre': string,
  'released': number,
  'is_favorite': boolean,
}


const TIME = 1000;

const VIDEO_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export type FilmCardProps = {
  id: number,
  name: string,
  previewImage: string,
  posterImage: string,
  previewVideoLink: string,
};

function FilmCard({id, name, previewImage, posterImage, previewVideoLink}: FilmCardProps): JSX.Element {
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
  }, [isDelayedHovered, isHovered]);

  const filmCardRoute = AppRoute.Film.replace(':id', `${id}/#Overview`);

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} onClick={() => history.push(filmCardRoute)}
    >
      {
        isDelayedHovered ?
          <div style={VIDEO_STYLES}>
            <video src={previewVideoLink} autoPlay muted poster={previewImage} width="280" height="175" style={{objectFit: 'cover'}} />
          </div> :
          <div className="small-film-card__image">
            <img src={posterImage} alt={name} width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={filmCardRoute}>{name}</Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
