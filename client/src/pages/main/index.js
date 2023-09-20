import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import KaKaoMap from './KakaoMap';
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCarList } from '../../store/carSlice';
import List from './MainCarList';
import socket from '../../soket';

const Main = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('databaseChange', (results) => {
      // 'databaseChange' 이벤트를 수신하면 데이터를 업데이트합니다.
      dispatch(getCarList({ carList: results }));
    });
  }, []);

  return (
    <main>
      <div className="nav-header">
        <button className="car-btn">운행중</button>
        <button className="car-btn">충전소</button>
      </div>
      <List carList={carList} />
      <div className="map">
        <KaKaoMap carList={carList} />
      </div>
    </main>
  );
};

export default Main;
