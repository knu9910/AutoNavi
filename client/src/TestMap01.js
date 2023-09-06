import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import './TextOverlay.css';
import getDirections from './test';

const TestMap01 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [a, setA] = useState(37.39472714688412);
  const [b, setB] = useState(127.11015314141542);
  const [x, setX] = useState(37.39472714688412);
  const [y, setY] = useState(127.11015314141542);

  const mapFound = async () => {
    // const data = await getDirections(); // 차량에 현재 위치를 주는 api
    // console.log(data.roads[0].vertexes);
    // setX(data.roads[0].vertexes[1]);
    // setY(data.roads[0].vertexes[0]);
    // console.log(data.roads[1].vertexes[0]);
    // console.log(data.roads[0].vertexes[1]);
  };
  const updateLatLng = () => {
    const newX = x + 0.001;
    const newY = y + 0.001;

    setX(newX);
    setY(newY);
  };
  useEffect(() => {
    // mapFound();
    const intervalId = setInterval(updateLatLng, 3000);
    return () => clearInterval(intervalId);
  }, [x, y]);

  const markerPosition = {
    lat: x,
    lng: y,
  };

  return (
    <>
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: a,
          lng: b,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={5} // 지도의 확대 레벨
      >
        <MapMarker position={markerPosition} onClick={() => setIsOpen(true)} />
        {isOpen && (
          <CustomOverlayMap position={markerPosition}>
            <div className="wrap">
              <div className="info">
                <div className="title">
                  카카오 스페이스닷원
                  <div
                    className="close"
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  ></div>
                </div>
                <div className="body">
                  <div className="img">
                    <img
                      src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                      width="73"
                      height="70"
                      alt="카카오 스페이스닷원"
                    />
                  </div>
                  <div className="desc">
                    <div className="ellipsis">
                      제주특별자치도 제주시 첨단로 242
                    </div>
                    <div className="jibun ellipsis">
                      (우) 63309 (지번) 영평동 2181
                    </div>
                    <div>
                      <a
                        href="https://www.kakaocorp.com/main"
                        target="_blank"
                        className="link"
                        rel="noreferrer"
                      >
                        홈페이지
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ;
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default TestMap01;
