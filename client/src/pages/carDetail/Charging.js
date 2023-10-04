import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCar } from '../../store/carSlice';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import '../../styles/charging.css';
import DetailMap from './DetailMap';
import History from './History';

const Charging = () => {
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const carList = useSelector((state) => state.carStore.carList);

  const getCar = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cars/${id}`);
      const car = res.data;
      dispatch(getCurrentCar({ currentCar: car }));
    } catch (err) {
      navigate('/notFound');
      console.log(err);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  return (
    <div>
      <div className="car_wrap_detail_charging">
        <div className="car_detail_wrap_charging">
          <div className="car_info_charging">1234 차량정보</div>
          <div className="car_location_charging"></div>
          <div className="car_info_wrap_charging">
            <div className="car_info_inner_charging">
              <div className="info_label_charging">차량ID</div>
              <div className="info_box_charging">{currentCar.car_id}</div>
              <div className="info_label_charging">차량번호</div>
              <div className="info_box_charging">{currentCar.car_number}</div>
              <div className="info_label_charging">차명</div>
              <div className="info_box_charging">{currentCar.car_name}</div>
              <div className="info_label_charging">차종</div>
              <div className="info_box_charging">{currentCar.car_type}</div>
              <div className="info_label_charging">현재위치</div>
              <div className="info_box_charging">{currentCar.traffic_name}</div>
              <div className="info_label_charging">배터리타입</div>
              <div className="info_box_charging">{currentCar.battery_type}</div>
              <div className="info_label_charging">배터리 잔량</div>
              <div className="info_box_charging">
                {currentCar.realtime_battery + '%'}
              </div>
              <div className="info_label_charging">운행 현황</div>
              <div className="info_box_charging">
                {currentCar.realtime_operation_st}
              </div>
            </div>
          </div>
          <DetailMap carList={carList} />
        </div>
      </div>
      <div>
        <History />
      </div>
    </div>
  );
};

export default Charging;
