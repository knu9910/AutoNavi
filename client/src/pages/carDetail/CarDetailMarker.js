import { MapMarker } from 'react-kakao-maps-sdk';
import Marker from '../../img/carmarker.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const CarDetailMarker = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentCar = useSelector((state) => state.carStore.currentCar);

  console.log(car);
  return (
    <MapMarker
      position={{
        // 마커가 표시될 위치입니다
        lat: currentCar.location_x,
        lng: currentCar.location_y,
      }}
      image={{
        src: Marker, // 마커이미지의 주소입니다
        size: {
          width: 40,
          height: 40,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 12,
            y: 36,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
      clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
      {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
    </MapMarker>
  );
};

export default CarDetailMarker;
