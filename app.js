require('dotenv').config();
const express = require('express');
const promBundle = require("express-prom-bundle");
const weatherRouter = require('./weatherRouter');

const metricsMiddleware = promBundle({ includeMethod: true, includePath: true });

const app = express();
const { PORT } = process.env;

app.use(metricsMiddleware);
app.use(express.json());
app.use('/v1', weatherRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту: ${PORT}`);
});
