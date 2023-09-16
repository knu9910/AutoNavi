const pool = require('../models/pool');

const carService = {
  async delete(id) {
    const connection = await pool.getConnection();
    try {
      // 트랜잭션 시작
      await connection.beginTransaction();

      // car_realtime 테이블에서 관련 데이터 삭제
      await connection.query('DELETE FROM car_realtime WHERE car_id = ?', [id]);

      // car 테이블에서 데이터 삭제
      const [result] = await connection.query('DELETE FROM car WHERE id = ?', [
        id,
      ]);

      // 트랜잭션 커밋
      await connection.commit();
      return result.affectedRows;
    } catch (error) {
      // 에러 발생 시 트랜잭션 롤백
      await connection.rollback();
      throw new Error('Service Error');
    } finally {
      // 연결 해제
      connection.release();
    }
  },
};

module.exports = carService;
