const Router = require('express');
const currentController = require('./controllers/current');
const forecastController = require('./controllers/forecast');

const router = new Router();

router.get('/current', currentController.getCurrent);
router.get('/forecast', forecastController.getForecast);

router.put('/current', currentController.putCurrent);
router.put('/forecast', forecastController.putForecast);

module.exports = router;
