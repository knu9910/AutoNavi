import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useParams } from 'react-router';
import '../../styles/carDetail.css';

const CarDetail = () => {
  const open = useDaumPostcodePopup();
  const { id } = useParams();
  console.log(id);
  const handleClick = (data) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 출발지 좌표 검색
    geocoder.addressSearch(data.address, function (startResult, startStatus) {
      if (startStatus === window.kakao.maps.services.Status.OK) {
        const startCoords = {
          x: startResult[0].x,
          y: startResult[0].y,
        };
        console.log(startCoords.x, startCoords.y);
        axios.post('http://localhost:8080/realTimeStart', {
          id: 3,
          departure: '127.111925428711,37.3968925296743',
          destination: `${startCoords.x},${startCoords.y}`,
        });
      } else {
        console.error('출발지 주소 검색 오류:', startStatus);
      }
    });
  };
  return (
    <div className="car_detail_wrap">
      <div className="car_info">1234 차량정보</div>
      <div className="car_info_wrap">
        <div className="car_info_inner">
          <div className="info_label">차량번호</div>
          <div className="info_box"></div>
          <div className="info_label">차종</div>
          <div className="info_box"></div>
          <div className="info_label">배터리</div>
          <div className="info_box"></div>
          <div className="info_label">운행 현황</div>
          <div className="info_box"></div>
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
            className="destination"
            type="text"
            placeholder="목적지를 검색하세요"
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
  );
};

export default CarDetail;
