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
  const buttonText = useSelector((state) => state.toggleStore.buttonText);
  const dispatch = useDispatch();

  console.log(carList[0]);
  const handleToggleMap = () => {
    dispatch(toggleButton());
  };

  useEffect(() => {
    const handleDatabaseChange = (results) => {
      // Redux 액션을 디스패치합니다.
      dispatch(getCarList({ carList: results }));
    };

    // 웹 소켓 이벤트 리스너를 등록합니다.
    socket.on('databaseChange', handleDatabaseChange);

    // 컴포넌트 언마운트 시 웹 소켓 이벤트 리스너를 해제합니다.
    return () => {
      socket.off('databaseChange', handleDatabaseChange);
    };
  }, [dispatch]); // dispatch를 의존성 배열에 포함해야 합니다.

  return (
    <main>
      <div className="nav-header">
        <button className="car-btn" onClick={handleToggleMap}>
          {buttonText}
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
