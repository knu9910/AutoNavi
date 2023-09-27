import { Map } from 'react-kakao-maps-sdk';
import CarDetailMarker from './CarDetailMarker';
import { useSelector } from 'react-redux';

const DetailMap = ({ carList }) => {
  const currentCar = useSelector((state) => state.carStore.currentCar);
  const carMarkers = carList.map((car) => (
    <CarDetailMarker key={car.car_id} car={car} />
  ));

  return (
    <Map
      className="map_running" // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: currentCar.location_x,
        lng: currentCar.location_y,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '300px',
      }}
      level={6} // 지도의 확대 레벨
    >
      {carMarkers}
    </Map>
  );
};
export default DetailMap;
