require('dotenv').config();

const axios = require('axios');
const carModel = require('../models/car_model');
const searchChargingStations = require('./searchChargingStations');
// 카카오 API 키
const REST_API_KEY = process.env.REST_API;
const wait = require('./wait');
async function getDirections(origin, destination) {
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

    return sections;
  } catch (err) {
    if (err.name === 'AxiosError') {
      throw new Error(err.response.data.msg);
    }
    throw new Error('Server Error');
  }
}

const updateInteval = async (
  id,
  destination,
  check = true,
  desCheck = false,
) => {
  try {
    const car = await carModel.findCar(id);
    const { data } = await axios.get(
      `http://localhost:8080/api/history/getHistoryByCar/${id}`,
    );
    let { cum_distance, cum_battery } = data;
    let x = '';
    let y = '';

    if (!car) throw new Error('Bad Request');
    const origin = `${car.location_y},${car.location_x}`;
    let battery = car.realtime_battery;

    let { distance, duration, roads } = await getDirections(
      origin,
      destination,
    );
    for (const real of roads) {
      const { name, traffic_speed, traffic_state, vertexes } = real;
      const road_distance = real.distance;
      const road_duration = real.duration;

      const coordinates = [];

      for (let i = 0; i < vertexes.length; i += 2) {
        coordinates.push([vertexes[i], vertexes[i + 1]]);
      }

      for (const location of coordinates) {
        distance -= road_distance / (vertexes.length / 2);
        cum_distance += road_distance / (vertexes.length / 2);
        duration -= road_duration / (vertexes.length / 2);

        if (distance < 0 || duration < 0) {
          distance = 0;
          duration = 0;
        }
        battery -= 0.1;
        cum_battery += 0.1;
        let [location_y, location_x] = location;
        if (check) {
          if (battery <= 30) {
            let charge = await searchChargingStations(location_x, location_y);
            await axios.put(
              `http://localhost:8080/api/history/updateHistory/${id}`,
              {
                cum_battery: parseInt(cum_battery),
                cum_distance: parseInt(cum_distance),
              },
            );
            return {
              charge,
              msg: 'low',
            };
          }
        }

        await axios.patch('http://localhost:8080/api/real/realcar', {
          location_x,
          location_y,
          battery,
          operation_st: '운행',
          origin,
          destination,
          distance: parseInt(distance),
          duration: parseInt(duration),
          traffic_speed,
          traffic_state,
          traffic_name: name,
          id,
        });

        await wait(1000 * 2); // 1분에 한번씩 업데이트 함
        x = location_x;
        y = location_y;
      }
    }
    await axios.put(`http://localhost:8080/api/history/updateHistory/${id}`, {
      cum_battery: parseInt(cum_battery),
      cum_distance: parseInt(cum_distance),
    });

    if (desCheck) {
      await axios.patch('http://localhost:8080/api/real/realcar', {
        location_x: x,
        location_y: y,
        battery,
        operation_st: '대기',
        origin: null,
        destination: null,
        distance: null,
        duration: null,
        traffic_speed: null,
        traffic_state: null,
        traffic_name: null,
        id,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// updateInteval(
//   1,
//   '127.10991634747967,37.39447145478345',
//   '127.10966790676201,37.394469584427156',
// );

// 함수 호출
module.exports = { updateInteval, wait };
