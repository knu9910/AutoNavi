require('dotenv').config();

const axios = require('axios');
const pool = require('../models/pool');
const carModel = require('../models/car_model');
// 카카오 API 키
const REST_API_KEY = process.env.REST_API;

const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

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

    const { roads } = sections;

    return roads;
  } catch (err) {
    if (err.name === 'AxiosError') {
      throw new Error(err.response.data.msg);
    }
    throw new Error('Server Error');
  }
}

const updateInteval = async (id, destination) => {
  try {
    const car = await carModel.findCar(id);
    if (!car) throw new Error('Bad Request');
    console.log(car);
    const origin = `${car.location_y},${car.location_x}`;
    let battery = car.realtime_battery;
    console.log(car.realtime_battery);
    const roads = await getDirections(origin, destination);

    for (const real of roads) {
      const {
        name,
        distance,
        duration,
        traffic_speed,
        traffic_state,
        vertexes,
      } = real;

      const coordinates = [];

      for (let i = 0; i < vertexes.length; i += 2) {
        coordinates.push([vertexes[i], vertexes[i + 1]]);
      }

      for (const location of coordinates) {
        battery -= 0.1;
        let [location_y, location_x] = location;
        const sql = `UPDATE car_realtime 
          SET 
          location_x = ?, location_y = ?, battery = ?, operation_st = ?, departure = ?, 
          destination = ?, distance = ?, duration = ?, traffic_speed = ?, traffic_state = ?, traffic_name = ? 
          WHERE car_id = ?`;

        let [response] = await pool.query(sql, [
          location_x,
          location_y,
          battery,
          '운행',
          origin,
          destination,
          distance,
          duration,
          traffic_speed,
          traffic_state,
          name,
          id,
        ]);
        console.log(1, location);
        if (!response.affectedRows) throw new Error('Bad Request');
        await wait(1000 * 0.5); // 1분에 한번씩 업데이트 함
      }

      let sql = `UPDATE car_realtime 
      SET 
      operation_st = ?
      WHERE car_id = ?`;
      let [res] = await pool.query(sql, ['대기', id]);
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
