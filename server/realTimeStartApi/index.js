const { updateInteval, wait } = require('../carHelperApis/realTimeUpdateApi');
const realTimeStartApi = async (req, res, io) => {
  try {
    const { id, destination } = req.body;
    const origin = '127.0334257,37.5632355';
    if (!id || !destination) {
      return res.status(400).end('Bad Request');
    }

    io.emit('operationalStatus', { id, msg: 'start' });
    await updateInteval(id, destination);
    io.emit('operationalStatus', { id, msg: 'arrived' });
    await wait(1000 * 20);
    io.emit('operationalStatus', { id, msg: 'goBack' });
    await updateInteval(id, origin);
    io.emit('operationalStatus', { id, msg: 'backArrived' });
    res.status(201).send('ok');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = realTimeStartApi;
