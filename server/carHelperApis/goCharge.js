const goCharge = async (id, lowBat, io, updateInteval) => {
  io.emit('operationalStatus', {
    id,
    msg: 'lowBattery',
    info: lowBat.charge,
  });
  const { x, y } = lowBat.charge;

  await updateInteval(id, `${x},${y}`, false);
};

module.exports = goCharge;
