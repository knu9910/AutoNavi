import { Map } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import CarMarkerEntry from './CarMarkerEntry';
import ChargeMarkerEntry from './ChargeMarkerEntry';
const KaKaoMap = ({ carList }) => {
  const cargeList = useSelector((state) => state.chargeStore.chargeList);

  const chargeMarkers = cargeList.map((charge) => {
    return <ChargeMarkerEntry key={charge.car_id} charge={charge} />;
  });

  const carMarkers = carList.map((car) => (
    <CarMarkerEntry key={car.car_id} car={car} />
  ));

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
      {carMarkers}
    </Map>
  );
};
export default KaKaoMap;
