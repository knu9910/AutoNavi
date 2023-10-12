const watchDatabaseChanges = require('./carHelperApis/watchDatabaseChanges');

function socket(io) {
  io.on('connection', (socket) => {
    console.log('사용자가 연결 되었습니다.');
    watchDatabaseChanges(io);
    socket.on('disconnect', () => {
      console.log('사용자가 연결 해제되었습니다.');
    });
  });
}

module.exports = socket;
