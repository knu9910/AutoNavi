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
    const id = await carModel.create(req.body);

    if (!id) throw new Error('Server Error');
    res.status(201).json({ id, msg: 'Sucess' });
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
    if (!car) return res.status(400).send('존재하지 않는 차량입니다.');
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '데이터베이스 오류' }); // 기타 데이터베이스 오류에 대한 에러 응답
  }
});

router.get('/', async (req, res) => {
  try {
    const car = await carModel.findCarList();
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
    console.log(check);
    if (!check) throw new Error('Server Error');
    res.status(200).send('삭제 완료');
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});
module.exports = router;
