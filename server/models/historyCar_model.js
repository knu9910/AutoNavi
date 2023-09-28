const pool = require('./pool');

const historyCarModel = {
  async chargePost(article) {
    const sql = `INSERT INTO charge_history set ?`;

    const [result] = await pool.query(sql, [article]);
    return result.insertId;
  },

  // 하나의 차량의 날짜별 충전소 history
  async chargeFind(id, preDate, nextDate) {
    console.log(id, preDate, nextDate);
    const sql = `
    SELECT *
    FROM charge_history
    WHERE car_id = ? AND createdAt >= ? AND createdAt <= ?
  `;

    const [rows] = await pool.query(sql, [id, preDate, nextDate]);
    return rows;
  },

  // 전체 차량의 토탈 금액 history
  async chargeFindAll(preDate, nextDate) {
    const sql = `SELECT car_id, SUM(fee) AS total_charge
      FROM charge_history
      WHERE createdAt >= ? AND createdAt <= ?
      GROUP BY car_id`;

    const [rows] = await pool.query(sql, [preDate, nextDate]);
    return rows;
  },
  async historyUpdate(id, article) {
    const sql = `UPDATE car_history SET
      ${article.accident !== undefined ? 'accident = ?,' : ''}
      ${article.cum_distance !== undefined ? 'cum_distance = ?,' : ''}
      ${article.cum_battery !== undefined ? 'cum_battery = ?,' : ''}
      ${article.tire_change !== undefined ? 'tire_change = ?,' : ''}
      ${article.battery_change !== undefined ? 'battery_change = ?,' : ''}
      updatedAt = NOW()
      WHERE car_id = ?;
    `;

    // 업데이트할 속성 값들을 추출
    const values = [
      article.accident,
      article.cum_distance,
      article.cum_battery,
      article.tire_change,
      article.battery_change,
      id,
    ];

    // SQL 쿼리와 바인딩할 값을 반환
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  async getCarAllHistory() {
    const sql = `SELECT * FROM car_history`;
    const [history] = await pool.query(sql);
    return history;
  },

  async getCarHistoryByCarId(carId) {
    const sql = `
      SELECT *
      FROM car_history
      WHERE car_id = ?
    `;

    const [rows] = await pool.query(sql, [carId]);
    return rows;
  },
};

module.exports = historyCarModel;
