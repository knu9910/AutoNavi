const express = require('express');
const historyCarModel = require('../models/historyCar_model');

const router = express.Router();

router.get('/chargeFind/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await historyCarModel.chargeFind(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.get('/chargeFindAll', async (req, res) => {
  try {
    const result = await historyCarModel.chargeFindAll();
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
    console.error(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.get('/getAllHistory', async (req, res) => {
  try {
    // getCarAllHistory 함수를 호출하여 모든 히스토리 데이터를 가져옵니다.
    const history = await historyCarModel.getCarAllHistory();
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getTripHistory/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const tripHistory = await historyCarModel.getTripHistory(id);

    res.status(200).json(tripHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getAllTripHistory', async (req, res) => {
  try {
    const tripHistoryList = await historyCarModel.getAllTripHistory();

    res.status(200).json(tripHistoryList);
  } catch (error) {
    console.error(error);
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
// routes.js 파일에 다음 라우트를 추가합니다.
router.get('/getDailyDistanceData', async (req, res) => {
  try {
    const monthlyTotalDistance = await historyCarModel.getDailyDistanceData();
    res.status(200).json(monthlyTotalDistance);
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/getMonthlyTotalDistance', async (req, res) => {
  try {
    const monthlyTotalDistance =
      await historyCarModel.getMonthlyTotalDistance();
    res.status(200).json(monthlyTotalDistance);
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/getChargeTotal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const chargeTotal = await historyCarModel.getWeeklyChargeTotal(id);
    res.status(200).json(chargeTotal);
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/getMonthlyChargeTotal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const monthlyChargeTotal = await historyCarModel.getMonthlyChargeTotal(id);
    res.status(200).json(monthlyChargeTotal);
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/getChargeHistoryAll', async (req, res) => {
  try {
    const chargeHistoryAll = await historyCarModel.getChargeHistoryAll();
    res.status(200).json(chargeHistoryAll);
  } catch (error) {
    console.error('쿼리 실행 오류:', error.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
