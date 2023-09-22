const pool = require('./pool');

const realCarModel = {
  async realCarPost(article) {
    const {
      location_x,
      location_y,
      battery,
      operation_st,
      origin,
      destination,
      distance,
      duration,
      traffic_speed,
      traffic_state,
      traffic_name,
      id,
    } = article;

    const sql = `UPDATE car_realtime 
          SET 
          location_x = ?, location_y = ?, battery = ?, operation_st = ?, departure = ?, 
          destination = ?, distance = ?, duration = ?, traffic_speed = ?, traffic_state = ?, traffic_name = ? 
          WHERE car_id = ?`;

    let [response] = await pool.query(sql, [
      location_x,
      location_y,
      battery,
      operation_st,
      origin,
      destination,
      distance,
      duration,
      traffic_speed,
      traffic_state,
      traffic_name,
      id,
    ]);

    return response.affectedRows;
  },
};

module.exports = realCarModel;
