const fetch = require('node-fetch');
const { setValue, setManyValue } = require('../redis');
const { unit: unitsMap } = require('../enums/unit');

const { API_BASE: BASE_URL, SECRET_KEY } = process.env;

module.exports.getCurrent = function(req, res) {
    const city = req.param('city');
    const units = req.param('units') ?? 'celsius';

    if (!city) {
        res.send('Введите город');
        return;
    }

    if (res.locals.value !== null && res.locals.value !== undefined) {
        res.send({
            city,
            unit: units,
            temperature: Number(res.locals.value),
        });
        return;
    }

    if (!SECRET_KEY) {
        res.send('Введите секретный ключ');
        return;
    }

    fetch(`${BASE_URL}/data/2.5/weather?q=${city}&appid=${SECRET_KEY}&units=${unitsMap[units]}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod === '404' || data.main === undefined) {
                res.send(data.message);
                return;
            }

            setValue(`current-${city.toLowerCase()}`, Math.round(data.main.temp));
    
            res.send({
                city: city,
                unit: units,
                temperature: Math.round(data.main.temp),
            });
        });
}

module.exports.putCurrent = async function(req, res) {
    const data = req.body;
    const prepareData = {};

    for (const key in data) {
        prepareData[`current-${key.toLowerCase()}`] = Number(data[key]);
    }

    await setManyValue(prepareData); 
    res.status(200).send();
}
