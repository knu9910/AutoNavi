import { MapMarker } from 'react-kakao-maps-sdk';
import Marker from '../../img/charging.png';
import { useState } from 'react';

const ChargeMarkerEntry = ({ charge }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(charge);
  return (
    <MapMarker
      position={{
        // 마커가 표시될 위치입니다
        lat: charge.y,
        lng: charge.x,
      }}
      image={{
        src: Marker, // 마커이미지의 주소입니다
        size: {
          width: 64,
          height: 69,
        }, // 마커이미지의 크기입니다
      }}
      clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen && (
        <div style={{ minWidth: '150px' }}>
          <div
            style={{ padding: '5px', color: '#000' }}
          >{`충전소: ${charge.place_name}`}</div>
          <div>{`주소: ${charge.road_address_name}`}</div>
          <div>{`번호: ${charge.phone}`}</div>
        </div>
      )}
    </MapMarker>
  );
};

export default ChargeMarkerEntry;
