require('dotenv').config();

const axios = require('axios');
const pool = require('../models/pool');

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
  } catch (error) {
    console.error('Error:', error);
  }
}

const updateInteval = async (id = 1, origin, destination) => {
  try {
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
        let [location_x, location_y] = location;
        const sql = `UPDATE car_realtime 
          SET 
          location_x = ?, location_y = ?, battery = ?, operation_st = ?, departure = ?, 
          destination = ?, distance = ?, duration = ?, traffic_speed = ?, traffic_state = ?, traffic_name = ? 
          WHERE car_id = ?`;

        await pool.query(sql, [
          location_x,
          location_y,
          50,
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

        await wait(1000 * 60); // 1분에 한번씩 업데이트 함
      }
    }
  } catch (err) {
    console.error(err);
  }
};

updateInteval(
  1,
  '127.10991634747967,37.39447145478345',
  '127.10966790676201,37.394469584427156',
);

// 함수 호출
module.exports = { updateInteval };
