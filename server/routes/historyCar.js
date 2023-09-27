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
    console.err(err);
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
    console.err(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

router.post('/chargePost', async (req, res) => {
  try {
    const result = await historyCarModel.chargePost(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: '데이터베이스 오류' });
  }
});

module.exports = router;
