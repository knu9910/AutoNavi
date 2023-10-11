const axios = require('axios');

require('dotenv').config();
// 발급받은 카카오 API 키
const apiKey = process.env.REST_API;

// 검색할 키워드 (전기차 충전소)
const keyword = '전기차 충전소';

// 중심 좌표 (예: 서울시청 좌표)

// 검색 반경 (미터)
const radius = 5000;

async function searchChargingStations(centerY, centerX) {
  console.log(centerX, centerY);
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        params: {
          query: keyword,
          x: centerX,
          y: centerY,
          radius: radius,
        },
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      },
    );

    const places = response.data.documents;
    // 검색 결과를 처리하는 코드 작성

    places.sort((a, b) => a.distance - b.distance);

    const chargeSt = places[0];
    const recommenPlaces = places.slice(1, 10);

    return { chargeSt, recommenPlaces };
  } catch (error) {
    // 오류 처리
    console.error(error);
  }
}

// async 함수 호출

module.exports = searchChargingStations;
