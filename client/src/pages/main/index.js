import { useDispatch, useSelector } from 'react-redux';
import KaKaoMap from './KakaoMap';
import '../../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeCarStatus } from '../../store/carSlice';
import { toggleButton } from '../../store/mainSlice';
import List from './MainCarList';

const Main = () => {
  const carList = useSelector((state) => state.carStore.carList);
  const isNavVisible = useSelector((state) => state.mainStore.isNavVisible);
  const buttonText = useSelector((state) => state.mainStore.buttonText);

  const dispatch = useDispatch();

  const carSelector = (e) => {
    dispatch(changeCarStatus({ status: e.target.value.slice(0, -1) }));
  };

  const handleToggleMap = () => {
    dispatch(toggleButton());
  };

  return (
    <main>
      <div className="nav-header">
        <button className="car-btn" onClick={handleToggleMap}>
          {buttonText}
        </button>
        <select onChange={carSelector} className="car-selbtn">
          <option>운행중</option>
          <option>충전중</option>
          <option>대기중</option>
        </select>
      </div>
      {isNavVisible && <List carList={carList} />}
      <div className="map">
        <KaKaoMap carList={carList} />
      </div>
    </main>
  );
};

export default Main;
