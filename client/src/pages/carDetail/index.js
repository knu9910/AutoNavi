import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useParams } from 'react-router';

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
    <div>
      <input />
      <button onClick={() => open({ onComplete: (data) => handleClick(data) })}>
        목적지 검색
      </button>
    </div>
  );
};

export default CarDetail;
