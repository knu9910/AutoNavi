import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCar } from '../../store/carSlice';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import '../../styles/running.css';
import DetailMap from './DetailMap';
import History from './History';

const Running = () => {
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

  const getTrafficStateText = (trafficState) => {
    switch (trafficState) {
      case 0:
        return '교통 상태 정보 없음';
      case 1:
        return '교통 정체';
      case 2:
        return '교통 지체';
      case 3:
        return '교통 서행';
      case 4:
        return '교통 원활';
      case 6:
        return '교통사고(통행 불가)';
      default:
        return 'nodata';
    }
  };

  return (
    <div>
      <div className="car_wrap_detail_running">
        <div className="car_detail_wrap_running">
          <div className="car_info_running">{currentCar.car_name} 차량정보</div>
          <div className="car_location_running"></div>
          <div className="car_info_wrap_running">
            <div className="car_info_inner_running">
              <div className="info_label_running">차량ID</div>
              <div className="info_box_running">{currentCar.car_id}</div>
              <div className="info_label_running">차량번호</div>
              <div className="info_box_running">{currentCar.car_number}</div>
              <div className="info_label_running">차명</div>
              <div className="info_box_running">{currentCar.car_name}</div>
              <div className="info_label_running">차종</div>
              <div className="info_box_running">{currentCar.car_type}</div>
              <div className="info_label_running">현재위치</div>
              <div className="info_box_running">{currentCar.traffic_name}</div>
              <div className="info_label_running">교통상태</div>
              <div className="info_box_running">
                {getTrafficStateText(currentCar.traffic_state)}
              </div>
              <div className="info_label_running">배터리 잔량</div>
              <div className="info_box_running">
                {currentCar.realtime_battery + '%'}
              </div>
              <div className="info_label_running">운행 현황</div>
              <div className="info_box_running">
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

export default Running;
