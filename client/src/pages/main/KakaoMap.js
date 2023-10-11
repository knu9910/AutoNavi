import { Map } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';
import CarMarkerEntry from './CarMarkerEntry';
import ChargeMarkerEntry from './ChargeMarkerEntry';

const KaKaoMap = ({ carList }) => {
  const cargeList = useSelector((state) => state.chargeStore.chargeList);
  const topCharges = useSelector((state) => state.chargeStore.topCharges);

  const lat = useSelector((state) => state.mainStore.lat);
  const lng = useSelector((state) => state.mainStore.lng);
  const chargeMarkers = cargeList.map((charge) => {
    return <ChargeMarkerEntry key={charge.id} charge={charge} />;
  });

  const carMarkers = carList.map((car) => (
    <CarMarkerEntry key={car.car_id} car={car} />
  ));

  const topChargeMakers = topCharges.map((charge) => {
    return <ChargeMarkerEntry key={charge.id} charge={charge} />;
  });
  return (
    <Map // 지도를 표시할 Container
      center={{
        // 멀티캠퍼스
        lat: lat,
        lng: lng,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '800px',
      }}
      level={3} // 지도의 확대 레벨
    >
      {carMarkers}
      {chargeMarkers}
      {topChargeMakers}
    </Map>
  );
};
export default KaKaoMap;
