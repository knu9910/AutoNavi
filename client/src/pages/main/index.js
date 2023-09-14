import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getRealTimeList } from '../../store/carRealTimeSlice';
import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import KaKaoMap from './KakaoMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/main.css';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <content>
      <div className="nav-header">
        <button className="car-btn">운행중</button>
        <button className="car-btn">충전소</button>
      </div>
      <div className="mainnav">
        <div className="nav-car-list">
          <div className="nav-b-bar">
            <div className="nav-c-info">
              <ul>
                <li className="li-detail" style={{ liststyle: 'none' }}>
                  <span>
                    <FontAwesomeIcon icon={faTruck} size="5x" />
                    <p>12가1234</p>
                  </span>
                  <span>
                    <p>주행 가능 거리</p>
                    <p>남은 주행 거리</p>
                  </span>
                  <span>
                    <p>출발 시간</p>
                    <p>예상 도착 시간</p>
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
