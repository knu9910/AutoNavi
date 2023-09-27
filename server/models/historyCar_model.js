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
};

module.exports = historyCarModel;
