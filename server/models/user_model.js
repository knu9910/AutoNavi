const pool = require('./pool');

const userModel = {
  // 회원 목록 조회
  async find() {
    try {
      const sql = `select * from AdminUser`;
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },
  // 회원 상세 조회
  async findById(id) {
    try {
      const sql = `select * from AdminUser where id = ?`;
      const [result] = await pool.query(sql, [id]);
      return result[0];
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },

  //사용자 등록
  async register(user) {
    try {
      const sql = `INSERT INTO AdminUser (userName, userId, password, email, position, controlRights) VALUES (?, ?, ?, ?, ?, ?)`;
      const [result] = await pool.query(sql, [
        user.userName,
        user.userId,
        user.password,
        user.email,
        user.position,
        user.controlRights,
      ]);
      return result.insertId;
    } catch (err) {
      throw new Error('DB Error: ' + err.message);
    }
  },

  // 회원 정보 수정
  async update(user) {
    try {
      const sql = `update AdminUser set userName = ?, userId = ?, password = ?, email = ?, position = ?, controlRights = ? where id = ?`;
      const [result] = await pool.query(sql, [
        user.userName,
        user.userId,
        user.password,
        user.email,
        user.position,
        user.controlRights,
        user.id,
      ]);
      return result.affectedRows;
    } catch (err) {
      throw new Error('Database Error: ' + err.message);
    }
  },

  //회원 삭제
  async delete(id) {
    try {
      const sql = `delete from AdminUser where id = ?`;
      const [result] = await pool.query(sql, [id]);
      return result.affectedRows;
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },

  //로그인
  async login(user) {
    try {
      const sql = 'SELECT * FROM AdminUser WHERE userId = ? AND password = ?';
      const [result] = await pool.query(sql, [user.userId, user.password]);
      return result;
    } catch (err) {
      throw new Error('Database Error: ' + err.message);
    }
  },
};

module.exports = userModel;
