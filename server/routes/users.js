const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

const userModel = require('../models/user_model');

// 사용자 목록 조회
router.get('/list', async (req, res, next) => {
  try {
    const list = await userModel.find();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// 사용자 상세 조회
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await userModel.findById(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 사용자 등록
router.post('/register', async (req, res, next) => {
  try {
    const existingUser = await userModel.findByUserIdOrEmail(
      req.body.userId,
      req.body.email,
    );

    if (existingUser) {
      // 중복된 아이디 또는 이메일이 이미 존재하는 경우
      if (existingUser.userId === req.body.userId) {
        res.status(400).json({ message: '이미 존재하는 사원번호입니다.' });
      } else if (existingUser.email === req.body.email) {
        res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
      }
    } else {
      const id = await userModel.register(req.body);
      console.log('관리자 등록 완료!');
      res.json({ id });
    }
  } catch (err) {
    next(err);
  }
});

// 사용자 수정
router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const count = await userModel.update({ ...req.body, id }); // 사용자 정보와 id를 합침
    res.json({ count });
  } catch (err) {
    next(err);
  }
});

// 사용자 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const count = await userModel.delete(id);

    if (count === 1) {
      console.log('삭제 성공!');
      res.json({ message: '삭제되었습니다.' });
    } else {
      res.status(404).json({ error: '삭제에 실패했습니다.' });
    }
  } catch (err) {
    next(err);
  }
});

//로그인
router.post('/login', async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userModel.login(user);

    if (result.length > 0) {
      // 로그인 성공
      const userId = result[0].userId;
      const userRole = result[0].role;
      const rights = result[0].controlRights;
      console.log('로그인 성공!');
      res.status(200).json({
        message: 'Login successful',
        role: userRole,
        controlRights: rights,
        userId: userId,
      });
    } else {
      // 로그인 실패
      console.log('로그인 실패!');
      res.status(401).json({ message: 'Wrong username or password' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
