import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

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

// export type FilmCardProps = {
//   films: Film;
//   onMouseEnter: (id: number) => void,
//   onMouseLeave: () => void
// }

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
      onMouseLeave={() => setHovered(false)} onClick={() => history.push(`/films/${films.id}`)}
    >
      {
        isDelayedHovered ?
          <div style={VIDEO_STYLES}>
            <video src={films.preview_video_link} autoPlay muted poster={films.preview_image} width="280" height="175" style={{objectFit: 'cover'}} />
          </div> :
          <div className="small-film-card__image">
            <img src={films.poster_image} alt={films.name} width="280" height="175" />
          </div>
      }
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${films.id}`}>{films.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
