import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getRealTimeList } from '../../store/carRealTimeSlice';
import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import KaKaoMap from './KakaoMap';

import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation, faTruck } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

const socket = io('http://localhost:8080', {
  withCredentials: true,
  transports: ['websocket'],
});

const Main = () => {
  const realTimeList = useSelector((state) => state.realTimeStore.realTimeList);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('databaseChange', (results) => {
      // 'databaseChange' 이벤트를 수신하면 데이터를 업데이트합니다.
      dispatch(getRealTimeList({ realTimeList: results }));
    });
  }, []);

  // 배러리 잔량 표시
  let batteryPercentage = 10;

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
    <content>
      <div className="nav-header">
        <button className="car-btn">운행중</button>
        <button className="car-btn">충전소</button>
      </div>
      <div className="mainnav">
        {/* 운행중 화면 */}
        <div className="nav-car-list">
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
                    <p>12가1234</p>
                  </span>
                  <span className="car-info">
                    <span>
                      <span>
                        <p> 57km </p>
                        <p> 주행 가능 거리</p>
                      </span>
                      <span>
                        <p>5시 30분</p>
                        <p>출발 시간</p>
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
        </div>
        {/* 충전소 화면 */}
        <div className="nav-car-list">
          <div className="nav-b-bar">
            <div className="nav-c-info">
              <div className="battery-bar"></div>
              <ul className="battery-bar-info">
                <li className="li-detail" style={{ liststyle: 'none' }}>
                  <span>
                    <FontAwesomeIcon
                      icon={faChargingStation}
                      style={{ color: '#000000' }}
                      size="3x"
                      onClick={() => (window.location.href = '/car/detail/:id')}
                    />
                  </span>
                  <span className="car-info">
                    <span>
                      <span>
                        <p> </p>
                        <p> 충전 가능 여부?</p>
                      </span>
                    </span>
                    <span>
                      <span>
                        <p></p>
                        <p>충전기 타입...?</p>
                      </span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="map">
        <KaKaoMap realTimeList={realTimeList} />
      </div>
    </content>
  );
};

export default Main;
