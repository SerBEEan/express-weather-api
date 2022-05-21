const Redis = require("ioredis");

const cluster = new Redis.Cluster([
  {
    port: 6379,
    host: 'm_a', // 172.18.0.7
  },
  {
    port: 6380,
    host: 'm_b', // 172.18.0.6
  },
  {
    port: 6381,
    host: 'm_c', // 172.18.0.5
  },
  {
    port: 6382,
    host: 'r_a', // 172.18.0.4
  },
  {
    port: 6383,
    host: 'r_b', // 172.18.0.3
  },
  {
    port: 6384,
    host: 'r_c', // 172.18.0.2
  },
]);

module.exports.setValue = async function(key, value) {
  await cluster.set(key, value);
}

module.exports.setManyValue = async function(object) {
  for (const key in object) {
      await cluster.set(key, object[key]);
  }
}

module.exports.getValue = async function(key) {
  const value = await cluster.get(key);
  return value;
}
