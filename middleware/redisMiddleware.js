const { getValue } = require('../redis');

module.exports = async function(req, res, next) {
    if (req.method === 'PUT') {
        next();
        return;
    }
    
    const city = req.param('city');
    const dt = req.param('dt');

    if (city && dt === undefined) {
        const value = await getValue(`current-${city.toLowerCase()}`);
        res.locals.value = value;
    }

    if (city && dt) {
        const value = await getValue(`forecast-${city.toLowerCase()}-${dt}`);
        res.locals.value = value;
    }

    next();
};
