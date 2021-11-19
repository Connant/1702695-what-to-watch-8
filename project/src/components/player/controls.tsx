import { Time } from '../../const';
import { formatRemainingTime } from '../../utils/utils';

type BarProps = {
  duration: number,
  currentTime: number,
}

export default function Controls({duration, currentTime}: BarProps): JSX.Element {
  const getTImePercent = (): number =>
    duration ? (100 / duration * currentTime) : Time.Zero;

  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress
          className="player__progress"
          value={currentTime}
          max={duration}
        />
        <div className="player__toggler" style={{left: `${getTImePercent()}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">
        {formatRemainingTime(duration - currentTime)}
      </div>
    </div>
  );
}

