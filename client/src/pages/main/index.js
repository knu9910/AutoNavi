import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getRealTimeList } from '../../store/carRealTimeSlice';
import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import KaKaoMap from './KakaoMap';

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
    <div>
      Main
      <KaKaoMap realTimeList={realTimeList} />
    </div>
  );
};

export default Main;
