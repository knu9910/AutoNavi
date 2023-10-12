const dotenv = require('dotenv');

// 기본 .env 파일 로딩
dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
console.log('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const watchDatabaseChanges = require('./carHelperApis/watchDatabaseChanges');
const realTimeStartApi = require('./realTimeStartApi');

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

app.post('/realTimeStart', (req, res) => {
  realTimeStartApi(req, res, io);
});

io.on('connection', (socket) => {
  console.log('사용자가 연결 되었습니다.');
  watchDatabaseChanges(io);

  socket.on('disconnect', () => {
    console.log('사용자가 연결 해제되었습니다.');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});

module.exports = app;
