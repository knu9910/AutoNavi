const express = require('express');
const router = express.Router();

const carModel = require('../models/car_model');
const carService = require('../services/carService');

router.post('/carReg', async (req, res) => {
  try {
    const { car_number, battery_type, car_type, car_name, mfg_date } = req.body;
    if (!car_number || !battery_type || !car_type || !car_name || !mfg_date) {
      return res.status(400).send('Bed request');
    }
    const check = await carModel.create(req.body);

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

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const car = await carModel.findCar(id);
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '데이터베이스 오류' }); // 기타 데이터베이스 오류에 대한 에러 응답
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const check = await carService.delete(id);
    if (!check) throw new Error('Server Error');
    res.json(200).send('삭제 완료');
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});
module.exports = router;
