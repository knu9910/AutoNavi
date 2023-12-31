import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate, useParams } from 'react-router';
import '../../styles/waiting.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { deleteCar } from '../../store/carSlice';
import History from './DetailHistory';
import CostChart from './CostChart';

const Waiting = () => {
  const destinationRef = useRef(null);
  const coordinates = useRef({ x: null, y: null });
  const storedControlRights = localStorage.getItem('controlRights');
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleDeleteCar = async () => {
    try {
      const userConfirmed = window.confirm('정말로 차량을 삭제하시겠습니까?');
      if (userConfirmed) {
        const res = await axios.delete(
          `${process.env.REACT_APP_API_SERVER}/api/cars/${id}`,
        );
        console.log(res.data);
        dispatch(deleteCar({ id }));
        navigate('/car/carlist');
        alert('차량이 성공적으로 삭제 되었습니다.');
      }
    } catch (err) {
      console.log(err);
      navigate('/notFound');
      alert('서버에 오류가 있습니다.');
    }
  };

  const open = useDaumPostcodePopup();

  const handleClick = (data) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 목적지 좌표 검색
    geocoder.addressSearch(data.address, function (startResult, startStatus) {
      if (startStatus === window.kakao.maps.services.Status.OK) {
        const startCoords = {
          x: startResult[0].x,
          y: startResult[0].y,
        };
        console.log(startResult[0].address.address_name);
        destinationRef.current.value = startResult[0].address.address_name;

        coordinates.current = startCoords;
      } else {
        console.error('목적지 주소 검색 오류:', startStatus);
      }
    });
  };

  const sendDataToServer = async () => {
    try {
      if (coordinates.current.x !== null && coordinates.current.y !== null) {
        const userConfirmed = window.confirm('정말로 운행을 시작하시겠습니까?');

        if (userConfirmed) {
          navigate(`/car/detail/${id}/running`);
          const response = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/realTimeStart`,
            {
              id: currentCar.car_id,
              destination: `${coordinates.current.x}, ${coordinates.current.y}`,
            },
          );
          console.log('서버 응답:', response.data);
        } else {
          console.log('데이터 전송 취소됨.');
        }
      } else {
        console.error('좌표를 사용할 수 없습니다.');
      }
    } catch (error) {
      console.error('서버로 데이터를 보내는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <div className="car_wrap_detail">
        <div className="car_detail_wrap">
          <div className="car_info">{currentCar.car_name} 차량정보</div>
          <div className="car_info_wrap">
            <div className="car_info_inner">
              <div className="info_label">차량ID</div>
              <div className="info_box">{currentCar.car_id}</div>
              <div className="info_label">차량번호</div>
              <div className="info_box">{currentCar.car_number}</div>
              <div className="info_label">차명</div>
              <div className="info_box">{currentCar.car_name}</div>
              <div className="info_label">차종</div>
              <div className="info_box">{currentCar.car_type}</div>
              <div className="info_label">제조년월일</div>
              <div className="info_box">{currentCar.mfg_date}</div>
              <div className="info_label">등록일</div>
              <div className="info_box">
                {currentCar.createdAt
                  ? currentCar.createdAt.slice(0, 10).replace(/-/g, '.')
                  : ''}
              </div>

              <div className="info_label">배터리</div>
              <div className="info_box">{currentCar.realtime_battery}</div>
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
                placeholder="(주) AutoNavi"
                readOnly
              ></input>
            </div>
            <div className="destination_wrap">
              <input
                ref={destinationRef}
                className="destination"
                type="text"
                placeholder="목적지 검색"
                readOnly
                onClick={() =>
                  open({ onComplete: (data) => handleClick(data) })
                }
              ></input>
            </div>
          </div>
          <div className="search_wrap">
            <button
              className="delete"
              onClick={handleDeleteCar}
              disabled={storedControlRights === '없음'}
            >
              차량 삭제
            </button>
            <button
              className="start"
              onClick={sendDataToServer}
              disabled={storedControlRights === '없음'}
            >
              운행 시작
            </button>
          </div>
        </div>
      </div>
      <div>
        <History />
        <CostChart />
      </div>
    </div>
  );
};

export default Waiting;
