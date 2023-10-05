require('dotenv').config();
const axios = require('axios');

// 변환할 좌표(위도와 경도)를 설정합니다.
const api_key = process.env.REST_API;

async function getCoordinateAddress(longitude, latitude) {
  try {
    // 카카오 API 엔드포인트 URL을 설정합니다.
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

    // 요청 헤더에 API 키를 포함시킵니다.
    const headers = {
      Authorization: `KakaoAK ${api_key}`,
    };

    // API 요청을 보내고 응답을 기다립니다.
    const response = await axios.get(url, { headers });

    // API 응답을 JSON 형식으로 파싱합니다.
    const data = response.data;

    // 주소를 추출합니다.
    const address = data.documents[0].address.address_name;

    console.log('변환된 주소:', address);
    return address;
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// getCoordinateAddress();
// 비동기 함수 호출
module.exports = getCoordinateAddress;
