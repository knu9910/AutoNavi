const { updateInteval } = require('../carHelperApis/realTimeUpdateApi');

const realTimeStartApi = async (req, res) => {
  try {
    const { id, departure, destination } = req.body;

    if (!id || !departure || !destination) {
      return res.status(400).end('Bad Request');
    }

    await updateInteval(id, departure, destination);

    res.status(201).send('ok');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = realTimeStartApi;
