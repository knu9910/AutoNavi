const dotenv = require('dotenv');

// 기본 .env 파일 로딩
dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
console.log('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

const express = require('express');

const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const realTimeStartApi = require('./realTimeStartApi');
const path = require('path');

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/api', indexRouter);

app.post('/realTimeStart', (req, res) => {
  realTimeStartApi(req, res);
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
