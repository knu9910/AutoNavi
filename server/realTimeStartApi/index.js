const charging = require('../carHelperApis/charging');
const goCharge = require('../carHelperApis/goCharge');
const { updateInteval, wait } = require('../carHelperApis/realTimeUpdateApi');

const realTimeStartApi = async (req, res) => {
  try {
    const io = req.app.get('io');
    const { id, destination } = req.body;
    const origin = '127.0334257,37.5632355';
    if (!id || !destination) {
      return res.status(400).end('Bad Request');
    }

    io.emit('operationalStatus', { id, msg: 'start' }); // 차량 출발
    let lowBat = await updateInteval(id, destination); // 배터리 확인
    if (lowBat && lowBat.msg === 'low') {
      await goCharge(id, lowBat, io, updateInteval);

      io.emit('operationalStatus', { id, msg: 'arrivedCarge' });
      await charging(id, io, lowBat);
      io.emit('operationalStatus', { id, msg: 'restart' });
      await updateInteval(id, destination);
      io.emit('operationalStatus', { id, msg: 'arrived' });
    } else {
      io.emit('operationalStatus', { id, msg: 'arrived' });
      await wait(1000 * 20);
      io.emit('operationalStatus', { id, msg: 'goBack' });
      lowBat = await updateInteval(id, origin, true, true);
      if (lowBat && lowBat.msg === 'low') {
        await goCharge(id, lowBat, io, updateInteval);
        io.emit('operationalStatus', { id, msg: 'arrivedCarge' });
        await charging(id, io, lowBat);
        io.emit('operationalStatus', { id, msg: 'restart' });
        await updateInteval(id, origin, true, true);
        io.emit('operationalStatus', { id, msg: 'backArrived' });
      } else {
        io.emit('operationalStatus', { id, msg: 'backArrived' });
      }
    }
    res.status(201).send('ok');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = realTimeStartApi;
