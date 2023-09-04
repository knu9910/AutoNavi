import { useEffect, useState } from 'react';
import getDirections from './test';

const TestMap = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // 마커가 표시될 위치입니다

  // 마커가 지도 위에 표시되도록 설정합니다

  const mapFound = async () => {
    const data = await getDirections(); // 차량에 현재 위치를 주는 api
    console.log(data.roads[0].vertexes);
    setX(data.roads[0].vertexes[0]);
    setY(data.roads[0].vertexes[1]);
    var markerPosition = new window.kakao.maps.LatLng(y, x);

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(y, x), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    marker.setMap(map);
  };

  useEffect(() => {
    mapFound();
  }, []);

  return <div id="map" style={{ width: '100%', height: '800px' }}></div>;
  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null);
};
export default TestMap;
