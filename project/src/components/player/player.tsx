/* eslint-disable camelcase */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFilm } from '../../store/selectors';
import { fetchFilmsAction } from '../../store/actions-api';
import { AppRoute, Time } from '../../const';

import Controls from './controls';
import Pause from './pause';
import Play from './play';

export default function Player(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const dispatch = useDispatch();
  const {id}: {id: string} = useParams();
  const filmId = Number(id);

  const ref = useRef<HTMLVideoElement>(null);
  const [isPlayed, setIsPlayed] = useState(false);
  const [duration, setDuration] = useState(Time.Zero);
  const [currentTime, setCurrentTime] = useState(Time.Zero);

  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch, filmId]);

  useEffect(() => {
    isPlayed ? ref.current?.play() : ref.current?.pause();
  }, [isPlayed]);

  return (
    <div className="player">
      <video
        src={currentMovie?.video_link}
        ref={ref}
        className="player__video"
        preload='metadata'
        poster={currentMovie?.preview_image}
        onTimeUpdate={(evt) => setCurrentTime(Math.round(evt.currentTarget.currentTime))}
        onDurationChange={(evt) => setDuration(Math.round(evt.currentTarget.duration))}
      />

      <Link to={AppRoute.Film.replace(':id', `${id}/#Overview`)}>
        <button type="button" className="player__exit">Exit</button>
      </Link>

      <div className="player__controls">

        <Controls
          duration={duration}
          currentTime={currentTime}
        />

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => setIsPlayed((state) => !state)}
          >
            {
              isPlayed ? <Pause /> : <Play />
            }
            <span>{isPlayed ? 'Pause' : 'Play'}</span>
          </button>

          <div className="player__name">{currentMovie?.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => ref.current?.requestFullscreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
