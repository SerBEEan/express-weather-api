# express-weather-api c Prometheus-Grafana
Я использую Prometheus-Grafana из репозитория [Einsteinish/Docker-Compose-Prometheus-and-Grafana](https://github.com/Einsteinish/Docker-Compose-Prometheus-and-Grafana)

## Подготовка
Необходимо склонировать репозиторий Prometheus в директорию `./metric/`

Далее, необходимо отредактировать файлы конфигурации, для того, чтобы Prometheus брал метрики из приложения погоды и чтобы при запуске контейнеров Prometheus, запускалось и приложение погоды

Внесите в следующие файлы изменения:

```
// ./metric/Docker-Compose-Prometheus-and-Grafana/prometheus/prometheus.yml
// в блоке scrape_configs, после всех job

- job_name: 'weather'
    scrape_interval: 5s
    static_configs:
      - targets: ['weather:3000']
```

```
// ./metric/Docker-Compose-Prometheus-and-Grafana/docker-compose.yml
// в блоке services, в самом конце

weather:
    build:
      context: ../../
      dockerfile: ./Dockerfile
    container_name: weather
    ports:
      - "8000:3000"
    networks:
      - monitor-net
    labels:
      org.label-schema.group: "monitoring"
```

## Запуск
Добавьте ключ для API
```
// ./.env
SECRET_KEY={your key}
```

Из директории `./metric/Docker-Compose-Prometheus-and-Grafana/`, выполните команду, для запуска всех контейнеров
```
docker-compose up
```

## Доступ к метрикам

После успешного запуска должны быть доступны следующие сервисы

`http://localhost:9090/graph` - страница Prometheus, для тестирования запросов на языке PromQL

**ВАЖНО**
Необходимо перейти на страницу `http://localhost:9090/targets` и убедиться, что каждый **Endpoint** имеет статус **UP**, иначе это означает, что не все контейнеры успешно запустились 

Через запрос `http://<container_adress>/metrics` можно смотреть метрики интересующего контейнера
**Например**, по адресу `http://localhost:9090/metrics`, можно увидеть метрики Prometheus, т.е. **все** метрики
А по адресу `http://localhost:8000/metrics`, можно увидеть метрики приложения погоды

По адресу `http://localhost:3000`, расположен интерфейс `Grafana`, для визуализации метрик в виде графиков

## Dashboard сервиса погоды
В директории `./metric/Docker-Compose-Prometheus-and-Grafana/` лежит файл `./model-dashboard.json`, с настройками графиков, которые используются для сервиса погоды

Их необходимо импортировать через интерфейс `Grafana`:
На странице `http://localhost:3000/dashboards`, нажимаем кнопку `Import`, вставляем подготовленный JSON и сохраняем dashboard
