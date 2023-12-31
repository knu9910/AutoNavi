const pool = require('../models/pool');

const watchDatabaseChanges = (io) => {
  const pollInterval = 1000 * 2; // 폴링 시간

  setInterval(async () => {
    try {
      // SELECT 쿼리를 실행하고 결과를 받아옴
      const [results] = await pool.query(
        `SELECT
        c.id AS car_id,
        c.car_number,
        c.battery_type,
        c.car_type,
        c.car_name,
        c.createdAt,
        c.mfg_date,
        cr.location_x,
        cr.location_y,
        cr.battery AS realtime_battery,
        cr.operation_st AS realtime_operation_st,
        cr.departure AS realtime_departure,
        cr.destination AS realtime_destination,
        cr.updatedAt AS realtime_updatedAt,
        cr.distance,
        cr.duration,
        cr.traffic_speed,
        cr.traffic_state,
        cr.traffic_name
      FROM
        car c
      INNER JOIN
        car_realtime cr ON c.id = cr.car_id`,
      );
      // 결과를 클라이언트로 전송
      io.emit('databaseChange', results);
    } catch (err) {
      console.error('Error querying the database:', err);
    }
  }, pollInterval);
};

module.exports = watchDatabaseChanges;
