const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

const userModel = require('../models/user_model');

// 사용자 목록 조회
router.get('/', async (req, res, next) => {
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
    const id = await userModel.register(req.body);
    console.log('관리자 등록 완료!');
    res.json({ id });
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
    res.json({ count });
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
      console.log('로그인 성공!');
      res.status(200).json({ message: 'Login successful' });
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
