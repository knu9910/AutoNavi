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
    console.log(article);
    const conditions = [];
    const values = [];

    if (article.accident !== undefined) {
      conditions.push('accident = ?');
      values.push(article.accident);
    }
    if (article.cum_distance !== undefined) {
      conditions.push('cum_distance = ?');
      values.push(article.cum_distance);
    }
    if (article.cum_battery !== undefined) {
      conditions.push('cum_battery = ?');
      values.push(article.cum_battery);
    }
    if (article.tire_change !== undefined) {
      conditions.push('tire_change = ?');
      values.push(article.tire_change);
    }
    if (article.battery_change !== undefined) {
      conditions.push('battery_change = ?');
      values.push(article.battery_change);
    }

    // 조건을 쉼표로 연결하여 SQL 쿼리 문자열 생성
    const conditionsString = conditions.join(', ');

    const sql = `
      UPDATE car_history
      SET ${conditionsString}, updatedAt = NOW()
      WHERE car_id = ?;
    `;

    values.push(id);

    // SQL 쿼리 실행
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
    return rows[0];
  },
};

module.exports = historyCarModel;
