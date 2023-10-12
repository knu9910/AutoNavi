const axios = require('axios');
const wait = require('./wait');

const charging = async (id, io, lowBat) => {
  const res = await axios.get(`${process.env.SERVER_API}/api/cars/${id}`);
  const car = res.data;
  const { location_x, location_y, realtime_battery } = car;

  let battery = realtime_battery;

  await wait(1000 * 10);
  let operation_st = '충전';
  let fee = 0;
  io.emit('operationalStatus', { id, msg: 'charging' });
  while (battery < 100) {
    battery += 2;
    fee += 313;
    if (battery >= 100) {
      battery = 100;
    }
    await axios.patch(`${process.env.SERVER_API}/api/real/realcar`, {
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
      traffic_name: lowBat.charge.chargeSt.place_name,
      id,
    });
    await wait(1000 * 10);
  }

  const ok = await axios.post(
    `${process.env.SERVER_API}/api/history/chargePost`,
    {
      car_id: id,
      name: lowBat.charge.chargeSt.place_name,
      fee,
      location: lowBat.charge.chargeSt.road_address_name,
    },
  );
  console.log(ok);
  io.emit('operationalStatus', { id, msg: 'compCharging' });
  await wait(1000 * 5);
};

module.exports = charging;
