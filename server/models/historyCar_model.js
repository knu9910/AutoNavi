const pool = require('./pool');

const historyCarModel = {
  async chargePost(article) {
    const sql = `INSERT INTO charge_history set ?`;

    const [result] = await pool.query(sql, [article]);
    return result.insertId;
  },

  // 하나의 차량의 날짜별 충전소 history
  async chargeFind(id, preDate, nextDate) {
    const sql = `
    SELECT ch.*, c.car_name  -- car_name 추가
    FROM charge_history ch
    JOIN car c ON ch.car_id = c.id
    WHERE ch.car_id = ? AND ch.createdAt >= ? AND ch.createdAt <= ?
  `;

    const [rows] = await pool.query(sql, [id, preDate, nextDate]);
    return rows;
  },

  // 전체 차량의 토탈 금액 history
  async chargeFindAll(preDate, nextDate) {
    const sql = `
      SELECT ch.car_id, c.car_name, SUM(ch.fee) AS total_charge  -- car_name 추가
      FROM charge_history ch
      JOIN car c ON ch.car_id = c.id
      WHERE ch.createdAt >= ? AND ch.createdAt <= ?
      GROUP BY ch.car_id, c.car_name;
    `;

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
    const sql = `SELECT ch.*, c.car_name  -- car_name 추가
                 FROM car_history ch
                 JOIN car c ON ch.car_id = c.id`;
    const [history] = await pool.query(sql);
    return history;
  },

  async getCarHistoryByCarId(carId) {
    const sql = `
      SELECT ch.*, c.car_name  -- car_name 추가
      FROM car_history ch
      JOIN car c ON ch.car_id = c.id
      WHERE ch.car_id = ?
    `;

    const [rows] = await pool.query(sql, [carId]);
    return rows[0];
  },

  async addTripHistory(article) {
    const { car_id, departure, destination, distance, msg } = article;

    // MySQL 쿼리를 생성하여 데이터베이스에 삽입
    const sql = `
      INSERT INTO trip_history (car_id, departure, destination, distance, msg)
      VALUES (?, ?, ?, ?, ?)
    `;

    // 쿼리 실행
    const [result] = await pool.query(sql, [
      car_id,
      departure,
      destination,
      distance,
      msg,
    ]);

    return result;
  },

  async getTripHistory(id) {
    const sql = `
        SELECT th.*, c.car_name  -- car_name 추가
        FROM trip_history th
        JOIN car c ON th.car_id = c.id
        WHERE th.car_id = ?
      `;

    // 쿼리 실행
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  async getAllTripHistory() {
    const sql = `SELECT th.*, c.car_name  -- car_name 추가
                 FROM trip_history th
                 JOIN car c ON th.car_id = c.id`;

    // 쿼리 실행
    const [rows] = await pool.query(sql);
    return rows;
  },

  async getTodayTotalDistance() {
    const today = new Date().toISOString().slice(0, 10);

    // 오늘 저장된 거리(distance) 합계 쿼리
    const query = `
      SELECT SUM(distance) AS total_distance
      FROM trip_history
      WHERE DATE(createdAt) = ?;
    `;

    const [results] = await pool.query(query, [today]);
    const totalDistance = results[0].total_distance || 0;
    return totalDistance;
  },
  async getTodayChargeTotal() {
    // 오늘 날짜 구하기

    const today = new Date().toISOString().slice(0, 10);

    // 오늘 저장된 충전 요금 합계 쿼리
    const sql = `
        SELECT SUM(fee) AS total_charge
        FROM charge_history
        WHERE DATE(createdAt) = ?;
      `;

    const [rows] = await pool.query(sql, [today]);
    const totalCharge = rows[0].total_charge || 0;

    return totalCharge;
  },

  async getDailyDistanceData() {
    // 이번 달의 시작 날짜와 종료 날짜를 계산합니다.
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );

    // 이번 달의 모든 날짜를 생성합니다.
    const dates = [];
    const currentDate = new Date(firstDayOfMonth);
    while (currentDate <= lastDayOfMonth) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 이번 달의 각 일자에 대한 total_distance를 계산하는 쿼리
    const sql = `
      SELECT DATE(createdAt) AS date, SUM(distance) AS total_distance
      FROM trip_history
      WHERE DATE(createdAt) >= ? AND DATE(createdAt) <= ?
      GROUP BY date
      ORDER BY date;
    `;

    const results = await Promise.all(
      dates.map(async (date) => {
        const [rows] = await pool.query(sql, [date, date]);
        const formattedDate = date.getDate(); // 날짜만 추출
        return {
          date: formattedDate,
          total_distance: rows[0] ? rows[0].total_distance : 0,
        };
      }),
    );

    return results;
  },
  async getMonthlyTotalDistance() {
    // 이번 년도를 가져옵니다.
    const thisYear = new Date().getFullYear();

    // 1월부터 12월까지의 월별 total_distance를 계산하는 쿼리
    const sql = `
      SELECT months.month, IFNULL(SUM(distance), 0) AS total_distance
      FROM (
        SELECT 1 AS month
        UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
        UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
        UNION SELECT 11 UNION SELECT 12
      ) AS months
      LEFT JOIN trip_history ON months.month = MONTH(createdAt) AND YEAR(createdAt) = ?
      GROUP BY months.month
      ORDER BY months.month;
    `;

    const [results] = await pool.query(sql, [thisYear]);

    return results;
  },

  async getWeeklyChargeTotal(carId) {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const results = [];

    // 일주일 간의 각 날짜에 대한 토탈 충전 요금을 가져옵니다.
    for (
      let date = oneWeekAgo;
      date <= today;
      date.setDate(date.getDate() + 1)
    ) {
      const currentDate = date.toISOString().slice(0, 10);

      const sql = `
        SELECT IFNULL(SUM(fee), 0) AS total_charge
        FROM charge_history
        WHERE car_id = ? AND DATE(createdAt) = ?
      `;

      const [rows] = await pool.query(sql, [carId, currentDate]);
      const totalCharge = rows[0].total_charge || 0;

      results.push({
        date: currentDate,
        total_charge: totalCharge,
      });
    }

    return results;
  },
  async getMonthlyChargeTotal(carId) {
    const today = new Date();
    const thisYear = today.getFullYear();

    const results = [];

    for (let month = 1; month <= 12; month++) {
      const firstDayOfMonth = new Date(thisYear, month - 1, 1);
      const lastDayOfMonth = new Date(thisYear, month, 0);

      const sql = `
        SELECT IFNULL(SUM(fee), 0) AS total_charge
        FROM charge_history
        WHERE car_id = ? AND DATE(createdAt) >= ? AND DATE(createdAt) <= ?
      `;

      const [rows] = await pool.query(sql, [
        carId,
        firstDayOfMonth.toISOString().slice(0, 10),
        lastDayOfMonth.toISOString().slice(0, 10),
      ]);

      const totalCharge = rows[0].total_charge || 0;

      results.push({
        month: month,
        total_charge: totalCharge,
      });
    }

    return results;
  },
};

module.exports = historyCarModel;
