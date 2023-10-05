const express = require('express');
const historyCarModel = require('../models/historyCar_model');

const router = express.Router();

router.get('/chargeFind/:id/:preDate/:nextDate', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { preDate, nextDate } = req.params;
    const preDateTime = `${preDate} 00:00:00`;
    const nextDateTime = `${nextDate} 23:59:59`;
    console.log(preDateTime);
    const result = await historyCarModel.chargeFind(
      id,
      preDateTime,
      nextDateTime,
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.get('/chargeFindAll/:preDate/:nextDate', async (req, res) => {
  try {
    const { preDate, nextDate } = req.params;
    const preDateTime = `${preDate} 00:00:00`;
    const nextDateTime = `${nextDate} 23:59:59`;
    const result = await historyCarModel.chargeFindAll(
      preDateTime,
      nextDateTime,
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.post('/chargePost', async (req, res) => {
  try {
    const result = await historyCarModel.chargePost(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.put('/updateHistory/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const article = req.body;

    // historyUpdate 함수를 호출하여 업데이트를 수행하고 결과를 받습니다.
    const updatedRows = await historyCarModel.historyUpdate(id, article);

    res
      .status(200)
      .json({ message: 'History updated successfully', updatedRows });
  } catch (err) {
    console.erroror(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.get('/getAllHistory', async (req, res) => {
  try {
    // getCarAllHistory 함수를 호출하여 모든 히스토리 데이터를 가져옵니다.
    const history = await historyCarModel.getCarAllHistory();
    res.status(200).json(history);
  } catch (err) {
    console.erroror(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.get('/getHistoryByCar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    // getCarHistoryByCarId 함수를 호출하여 차량별 히스토리 데이터를 가져옵니다.
    const history = await historyCarModel.getCarHistoryByCarId(id);
    res.status(200).json(history);
  } catch (err) {
    console.erroror(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.post('/addTripHistory', async (req, res) => {
  try {
    // 쿼리 실행
    const result = await historyCarModel.addTripHistory(req.body);

    // 성공적으로 삽입된 경우
    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'Trip history added successfully' });
    } else {
      res.status(500).json({ error: 'Failed to add trip history' });
    }
  } catch (error) {
    console.erroror(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getTripHistory/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const tripHistory = await historyCarModel.getTripHistory(id);

    res.status(200).json(tripHistory);
  } catch (error) {
    console.erroror(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getAllTripHistory', async (req, res) => {
  try {
    const tripHistoryList = await historyCarModel.getAllTripHistory();

    res.status(200).json(tripHistoryList);
  } catch (error) {
    console.erroror(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getTodayTotalDistance', async (req, res) => {
  try {
    // 오늘 날짜 구하기
    const totalDistance = await historyCarModel.getTodayTotalDistance();
    res.status(200).json({ totalDistance });
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getTodayChargeTotal', async (req, res) => {
  try {
    const totalCharge = await historyCarModel.getTodayChargeTotal();

    res.json({ totalCharge });
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
