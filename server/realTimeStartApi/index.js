const { updateInteval } = require('../carHelperApis/realTimeUpdateApi');

const realTimeStartApi = async (req, res) => {
  try {
    const { id, departure, destination } = req.body;

    if (!id || !departure || !destination) {
      return res.status(400).end('Bad Request');
    }

    updateInteval(id, departure, destination);
    res.status(201).send('ok');
  } catch (err) {
    console.error(err);
  }
};

module.exports = realTimeStartApi;
