import axios from 'axios';

// 카카오 API 키
const REST_API_KEY = '8b2be3bbdb94c868999328be4638f444';

async function getDirections() {
  const origin = '127.11015314141542,37.39472714688412';
  const destination = '127.10824367964793,37.401937080111644';
  const waypoints = '';
  const priority = 'RECOMMEND';
  const car_fuel = 'GASOLINE';
  const car_hipass = false;
  const alternatives = false;
  const road_details = false;

  try {
    const response = await axios.get(
      'https://apis-navi.kakaomobility.com/v1/directions',
      {
        params: {
          origin,
          destination,
          waypoints,
          priority,
          car_fuel,
          car_hipass,
          alternatives,
          road_details,
        },
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
      },
    );

    // 응답 데이터를 처리
    const sections = response.data.routes[0].sections[0];
    console.log(sections);
    return sections;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 함수 호출
export default getDirections;
