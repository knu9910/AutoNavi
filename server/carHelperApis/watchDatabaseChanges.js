const pool = require('../models/pool');

const watchDatabaseChanges = (io) => {
  const pollInterval = 1000 * 10; // 폴링 시간

  setInterval(async () => {
    try {
      // SELECT 쿼리를 실행하고 결과를 받아옴
      const [results] = await pool.query('SELECT * FROM car_realtime');

      // 결과를 클라이언트로 전송
      io.emit('databaseChange', results);
    } catch (err) {
      console.error('Error querying the database:', err);
    }
  }, pollInterval);
};

module.exports = watchDatabaseChanges;
