import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { changeCenter } from '../../store/mainSlice';

const MainCarEntry = ({ carInfo, onCenterMap }) => {
  const {
    distance,
    duration,
    car_name,
    car_type,
    realtime_battery,
    traffic_name,
    location_x,
    location_y,
  } = carInfo;
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(location_x, location_y);
    dispatch(changeCenter({ lat: location_x, lng: location_y }));
  };
  //duration
  const totalSeconds = duration;
  const timeString = secondsToHMS(totalSeconds);
  console.log(timeString);

  function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
  }

  //distance
  const totalMeters = distance;
  const mileage = metersToKMAndM(totalMeters);
  console.log(mileage);
  function metersToKMAndM(meters) {
    const km = Math.floor(meters / 1000);
    const m = meters % 1000;

    return `${km}km ${m}m`;
  }

  let batteryPercentage = realtime_battery;
  let batteryColorClass = '';

  if (batteryPercentage >= 71) {
    batteryColorClass =
      'progress-bar progress-bar-striped progress-bar-animated battery-green';
  } else if (batteryPercentage <= 70 && batteryPercentage >= 41) {
    batteryColorClass =
      'progress-bar progress-bar-striped progress-bar-animated battery-yellow';
  } else {
    batteryColorClass =
      'progress-bar progress-bar-striped progress-bar-animated battery-red';
  }

  let exclaColorClass = '';

  if (batteryPercentage >= 71) {
    exclaColorClass = 'battery-green';
  } else if (batteryPercentage <= 70 && batteryPercentage >= 41) {
    exclaColorClass = 'battery-yellow';
  } else {
    exclaColorClass = 'battery-red';
  }

  return (
    <div className="nav-b-bar">
      <div className="nav-c-info">
        <div className="battery-bar">
          <ExclamationCircleFill
            width="24"
            height="24"
            className={exclaColorClass}
          />
          <div
            className="progress batteryColorClass"
            role="progressbar"
            aria-label="Animated striped example"
            aria-valuenow={batteryPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated ${batteryColorClass}`}
              style={{ color: '#fff', width: `${batteryPercentage}%` }}
            >
              {batteryPercentage}%
            </div>
          </div>
        </div>
        <ul className="battery-bar-info">
          <li className="li-detail" style={{ liststyle: 'none' }}>
            <span>
              <FontAwesomeIcon icon={faTruck} size="5x" onClick={handleClick} />
              <p>{car_name}</p>
            </span>
            <span className="car-info">
              <span>
                <span>
                  <p>{car_type}</p>
                  <p>차량 타입</p>
                </span>
                <span>
                  <p>{traffic_name}</p>
                  <p>현재위치</p>
                </span>
              </span>
              <span>
                <span>
                  <p> {mileage} </p>
                  <p> 남은 주행 거리 </p>
                </span>
                <span>
                  <p> {timeString}</p>
                  <p>예상 도착 시간</p>
                </span>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MainCarEntry;
