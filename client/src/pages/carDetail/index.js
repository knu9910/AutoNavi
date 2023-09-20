import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useParams } from 'react-router';
import '../../styles/carDetail.css';
// import ToastNotification from './ToastNotification';
import Toastify from './Toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { getCurrentCar } from '../../store/carSlice';

const CarDetail = () => {
  const destinationRef = useRef(null);
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getCar = async () => {
    const res = await axios.get(`http://localhost:8080/api/cars/${id}`);
    const car = res.data;
    dispatch(getCurrentCar({ currentCar: car }));
  };

  useEffect(() => {
    getCar();
  }, []);

  console.log(currentCar);

  const open = useDaumPostcodePopup();

  const handleClick = (data) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 출발지 좌표 검색
    geocoder.addressSearch(data.address, function (startResult, startStatus) {
      if (startStatus === window.kakao.maps.services.Status.OK) {
        const startCoords = {
          x: startResult[0].x,
          y: startResult[0].y,
        };
        console.log(startResult[0].address.address_name);
        destinationRef.current.value = startResult[0].address.address_name;
        axios.post('http://localhost:8080/realTimeStart', {
          id: currentCar.car_id,
          departure: '127.111925428711,37.3968925296743',
          destination: `${startCoords.x},${startCoords.y}`,
        });
      } else {
        console.error('출발지 주소 검색 오류:', startStatus);
      }
    });
  };

  return (
    <div className="car_wrap_detail">
      <div className="car_detail_wrap">
        <div className="car_info">1234 차량정보</div>
        <div className="car_info_wrap">
          <div className="car_info_inner">
            <div className="info_label">차량번호</div>
            <div className="info_box">{currentCar.car_number}</div>
            <div className="info_label">차종</div>
            <div className="info_box">{currentCar.car_type}</div>
            <div className="info_label">배터리</div>
            <div className="info_box">{}</div>
            <div className="info_label">운행 현황</div>
            <div className="info_box">{currentCar.realtime_operation_st}</div>
          </div>
        </div>
        <div className="input_box">
          <div className="icon"></div>
          <div className="origin_wrap">
            <input
              className="origin"
              type="text"
              placeholder="출발지"
              readOnly
            ></input>
          </div>
          <div className="destination_wrap">
            <input
              ref={destinationRef}
              className="destination"
              type="text"
              placeholder="목적지를 검색하세요"
              readOnly
            ></input>
          </div>
        </div>
        <div className="search_wrap">
          <button
            className="search"
            onClick={() => open({ onComplete: (data) => handleClick(data) })}
          >
            목적지 검색
          </button>
        </div>
      </div>
      <Toastify />;
    </div>
  );
};

export default CarDetail;
