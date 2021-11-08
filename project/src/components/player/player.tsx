import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FilmProps } from '../film-card/film-card';
import { Redirect, useParams } from 'react-router';


type AddReviewProps = {
  films: FilmProps[],
}

function Player({films}: AddReviewProps): JSX.Element {

  const { id }: {id: string} = useParams();

  const currentFilms = films.find((film) => film.id === Number(id));

  if (!currentFilms) {
    return <Redirect to='/' />;
  }

  const playerStyles = {
    left: '30%',
  };

  return (
    <div className="player">
      <video src={currentFilms.videoLink} className="player__video" poster="img/player-poster.jpg"></video>

      <Link to={AppRoute.Main} type="button" className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={playerStyles}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
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

export default Player;
