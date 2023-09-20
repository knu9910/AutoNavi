import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

const MainCarEntry = ({ carInfo }) => {
  const {
    car_name,
    car_number,
    car_type,
    battery_type,
    realtime_battery,
    cartype,
    traffic_name,
  } = carInfo;

  console.log(carInfo);
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
              <FontAwesomeIcon
                icon={faTruck}
                size="5x"
                onClick={() => (window.location.href = '/car/detail/:id')}
              />
              <p>{car_number}</p>
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
                  <p> 57km </p>
                  <p> 남은 주행 거리 </p>
                </span>
                <span>
                  <p>5시 30분</p>
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
