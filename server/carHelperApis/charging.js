const axios = require('axios');
const wait = require('./wait');

const charging = async (id, io) => {
  const res = await axios.get(`http://localhost:8080/api/cars/${id}`);
  const car = res.data;
  const { location_x, location_y, realtime_battery } = car;

  let battery = realtime_battery;

  await wait(1000 * 10);
  let operation_st = '충전';
  io.emit('operationalStatus', { id, msg: 'charging' });
  while (battery < 100) {
    battery += 2;

    if (battery >= 100) {
      battery = 100;
      operation_st = '대기';
    }
    await axios.patch('http://localhost:8080/api/real/realcar', {
      location_x,
      location_y,
      battery,
      operation_st,
      origin: null,
      destination: null,
      distance: 0,
      duration: 0,
      traffic_speed: null,
      traffic_state: null,
      traffic_name: null,
      id,
    });
    await wait(1000 * 10);
  }
  io.emit('operationalStatus', { id, msg: 'compCharging' });
  await wait(1000 * 5);
};

module.exports = charging;
