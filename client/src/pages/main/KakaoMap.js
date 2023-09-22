import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Marker from '../../img/marker.png';
const KaKaoMap = ({ carList }) => {
  const markers = carList.map((reatime) => {
    return (
      <MapMarker
        key={reatime.car_id} // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: reatime.location_x,
          lng: reatime.location_y,
        }}
        image={{
          src: Marker, // 마커이미지의 주소입니다
          size: {
            width: 64,
            height: 69,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 27,
              y: 69,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
    );
  });

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 37.54699,
        lng: 127.09598,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '800px',
      }}
      level={11} // 지도의 확대 레벨
    >
      {markers}
    </Map>
  );
};
export default KaKaoMap;
