import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Marker from '../../img/carmarker.png';

const CarMarkerEntry = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkerClick = () => {
    setIsOpen(!isOpen); // 마커를 클릭할 때 isOpen 상태를 토글합니다.
  };

  return (
    <>
      <MapMarker
        position={{
          // 마커가 표시될 위치입니다
          lat: car.location_x,
          lng: car.location_y,
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
        onClick={handleMarkerClick} // 마커 클릭 이벤트 핸들러를 추가합니다.
      />

      {/* 커스텀 오버레이 */}
      {isOpen && (
        <CustomOverlayMap
          position={{
            lat: car.location_x, // 마커 위치와 동일한 위치에 오버레이 표시
            lng: car.location_y,
          }}
          yAnchor={1.54}
        >
          <Link to={``}>
            <div
              className="custom-overlay"
              style={{
                fontSize: '13px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                width: '200px',
                outline: 'none',
                fontWeight: 'bold',
                padding: '5px 10px',
                margin: '14px',
                boxShadow: '-5px -5px 10px #D7F0FF, 5px 5px 8px #babebc',
                textDecoration: 'none',
                color: '#6e6e6e',
              }}
            >
              <span className="title">차량 정보</span>
              <div className="title">차량 이름: {car.car_name}</div>
              <div>차량번호: {car.car_number}</div>
              <div>남은거리: {car.distance}</div>
              <div>운행시간: {car.duration}</div>
              <div className="title"></div>
              <div></div>
            </div>
          </Link>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default CarMarkerEntry;
