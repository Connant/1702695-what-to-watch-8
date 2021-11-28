/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFilms } from '../../store/selectors';
import { fetchFilmsAction } from '../../store/actions-api';
import { Time } from '../../const';

import Controls from './controls';
import Loading from '../loading/loading';
// import Pause from './pause';
// import Play from './play';

export default function Player(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilms);
  const dispatch = useDispatch();
  const {id}: {id: string} = useParams();
  const filmId = Number(id);
  const history = useHistory();

  const ref = useRef<HTMLVideoElement | null>(null);

  const [isPlayed, setIsPlayed] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [duration, setDuration] = useState(Time.Zero);
  const [currentTime, setCurrentTime] = useState(Time.Zero);

  const currentMovie = currentFilms.find((film) => film.id === Number(id));

  function tmpSetIsPlaing(value: boolean) {
    // console.log(`value=${value}`);
    // console.log(`ref.current.pauesed=${ref.current?.paused}`);
    setIsPlayed(value);
  }

  // function onFocusEventListener() {
  //   console.log(`ref.current.pauesed=${ref.current?.paused}`);
  //   setIsPlayed(!!ref.current?.paused);
  // }

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch, filmId]);


  useEffect(() => {
    if (ref.current) {
      ref.current.onloadeddata = () => {
        setLoading(false);
      };

    }
  }, [ref]);


  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    if (ref.current !== null && isPlayed) {
      ref.current.play();
      return;
    }
    ref.current.pause();
  }, [isPlayed]);

  const handleLoadedData = () => {
    setIsPlayed(true);
    setLoading(false);
  };


  return (
    <div className="player">
      {isLoading ? <Loading /> : ''}
      <video
        src={currentMovie?.videoLink}
        ref={ref}
        className="player__video"
        preload='metadata'
        poster={currentMovie?.previewImage}
        onTimeUpdate={(evt) => setCurrentTime(Math.round(evt.currentTarget.currentTime))}
        onDurationChange={(evt) => setDuration(Math.round(evt.currentTarget.duration))}
        onLoadedData={handleLoadedData}
      />

      <button type="button" className="player__exit" onClick={() => history.goBack()}>
        Exit
      </button>


      <div className="player__controls">

        <Controls duration={duration} currentTime={currentTime} />

        <div className="player__controls-row">
          {isPlayed === true ?
            <button type="button" className="player__play" onClick={()=>tmpSetIsPlaing(false)}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button>
            :
            <button type="button" className="player__play" onClick={()=> tmpSetIsPlaing(true)} >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>}

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
