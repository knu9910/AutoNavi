import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import Marker from '../../img/charging.png';
import { useState } from 'react';

const ChargeMarkerEntry = ({ charge }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
      />
      {isOpen && (
        <CustomOverlayMap
          position={{
            lat: charge.y, // 마커 위치와 동일한 위치에 오버레이 표시
            lng: charge.x,
          }}
          yAnchor={1.7}
        >
          <div
            className="custom-overlay"
            style={{
              fontSize: '13px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              width: '300px',
              outline: 'none',
              fontWeight: 'bold',
              padding: '5px 10px',
              margin: '14px',
              boxShadow: '-5px -5px 10px #D7F0FF, 5px 5px 8px #babebc',
              textDecoration: 'none',
              color: '#6e6e6e',
            }}
          >
            <div>{`충전소: ${charge.place_name}`}</div>
            <div>{`주소: ${charge.road_address_name}`}</div>
            <div>{`번호: ${charge.phone}`}</div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default ChargeMarkerEntry;
