# express-weather-api
Возращает данные о текущей погоде и прогноз (врепед до 7 дней) \
В качестве внешнего АПИ используется openWeatherMap

## Запуск
Указать в `.env` **SECRET_KEY** и запустить
```
npm start
```

Или сразу запустить
```
SECRET_KEY={your key} npm start
```

## .env
Тут конфиг-переменные \
**PORT** - порт на котором поднимается сервер \
**API_BASE** - урл для внешего АПИ погоды \
**SECRET_KEY** - ключ от внешнего АПИ \
**AUTH_HOST** - хост для сервиса авторизации

## Конечные точки
* /v1/current - текущая погода \
Get параметры: \
[**require**] city (*string*) - навание города \
units (*"kelvin" | "celsius" | "fahrenheit"*) - единицы измерения, стандартно celsius

* /v1/forecast - прогноз \
[**require**] city (*string*) - навание города \
[**require**] dt (*number*) - timestamp \
units (*"kelvin" | "celsius" | "fahrenheit"*) - единицы измерения, стандартно celsius

## Интеграция с авторизацией
Если пользователя нет в хэш-таблице [сервиса авторизации](https://github.com/SerBEEan/python-weather-auth-service "python-weather-auth-service"), то по запросу на endpoint, придет ошибка 403

Авторизация производится по заголовку `Own-Auth-UserName` в http-запросе, где значение - имя пользователя (например, `admin`)

__Перед__ запуском сервиса погоды, запустите сервис авторизации

По умолчанию, он поднимется на хосту *localhost:8080*

```
python server.py
```

## Docker-compose
Для запуска проекта, расположите директорию [сервиса авторизации](https://github.com/SerBEEan/python-weather-auth-service "python-weather-auth-service") на одном уровне с директорией сервиса погоды

Вставьте `SECRET_KEY` в файл `env` или добавьте эту переменную в `docker-compose.yml`

Предварительно создайте сеть для контейнеров:
```
docker network create weather_net
```

Из директории `express-weather-api`, выполните:

```
docker-compose build
```
```
docker-compose up
```
