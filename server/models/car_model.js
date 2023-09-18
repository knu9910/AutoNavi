const pool = require('./pool');

const carModel = {
  async findCar(id) {
    const sql = `SELECT
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
    car_realtime cr ON c.id = cr.car_id
  WHERE
    c.id = ?;  
    `;
    const [result] = await pool.query(sql, [id]);
    return result[0];
  },
  async create(article) {
    const sql = `insert into car set ?`;
    const [result] = await pool.query(sql, [article]);
    return result.insertId;
  },
};

module.exports = carModel;
