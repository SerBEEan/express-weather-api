require('dotenv').config();
const express = require('express');
const weatherRouter = require('./weatherRouter');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use('/v1', authMiddleware, weatherRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту: ${PORT}`);
});
