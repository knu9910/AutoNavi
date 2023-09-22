const express = require('express');
const realCarModel = require('../models/realCar_model');
const router = express.Router();

router.patch('/realcar', async (req, res) => {
  try {
    const check = await realCarModel.realCarPost(req.body);
    console.log(check);
    if (!check) throw new Error('Server Error');
    res.status(201).json('Sucess');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: '중복된 레코드입니다.' }); // 클라이언트에 에러 응답 보냄
    } else {
      console.log(err.message);
      res.status(500).json({ error: '데이터베이스 오류' }); // 기타 데이터베이스 오류에 대한 에러 응답
    }
  }
});

module.exports = router;
