import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import KaKaoMap from './KakaoMap';
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCarList } from '../../store/carSlice';
import { toggleButton } from '../../store/toggleSlice';
import List from './MainCarList';
import socket from '../../soket';

const Main = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const isNavVisible = useSelector((state) => state.toggleStore.isNavVisible);
  const dispatch = useDispatch();
  const handleToggleMap = () => {
    dispatch(toggleButton());
  };
  useEffect(() => {
    socket.on('databaseChange', (results) => {
      dispatch(getCarList({ carList: results }));
    });
  }, []);

  return (
    <main>
      <div className="nav-header">
        <button className="car-btn" onClick={handleToggleMap}>
          충전소
        </button>
      </div>
      {isNavVisible && <List carList={carList} />}
      <div className="map">
        <KaKaoMap carList={carList} />
      </div>
    </main>
  );
};

export default Main;
