import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFilm } from '../../store/selectors';
import { fetchFilmsAction } from '../../store/actions-api';
import { Time } from '../../const';

import Controls from './controls';
import Pause from './pause';
import Play from './play';

export default function Player(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const dispatch = useDispatch();
  const {id}: {id: string} = useParams();
  const filmId = Number(id);
  const history = useHistory();

  const ref = useRef<HTMLVideoElement | null>(null);

  const [isPlayed, setIsPlayed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [duration, setDuration] = useState(Time.Zero);
  const [currentTime, setCurrentTime] = useState(Time.Zero);

  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch, filmId]);

  useEffect(() => {
    isPlayed ? ref.current?.pause() : ref.current?.play();
  }, [isPlayed]);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.onloadeddata = () => setIsLoading(false);
    }
    return () => {
      if (ref.current !== null) {
        ref.current.onloadeddata = null;
        ref.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    if (isLoading) {
      ref.current.play();
    }
  }, [isLoading]);

  return (
    <div className="player">
      <video
        src={currentMovie?.videoLink}
        ref={ref}
        className="player__video"
        preload='metadata'
        poster={currentMovie?.previewImage}
        onTimeUpdate={(evt) => setCurrentTime(Math.round(evt.currentTarget.currentTime))}
        onDurationChange={(evt) => setDuration(Math.round(evt.currentTarget.duration))}
      />

      <button type="button" className="player__exit" onClick={() => history.goBack()}>
        Exit
      </button>


      <div className="player__controls">

        <Controls duration={duration} currentTime={currentTime} />

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlayed((state) => !state)} >

            {isPlayed ? <Play /> : <Pause /> }

            <span>
              {isPlayed ? 'Play' : 'Pause'}
            </span>

          </button>

          <div className="player__name">{currentMovie?.name}</div>

          <button type="button" className="player__full-screen" onClick={() => ref.current?.requestFullscreen()}>
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
