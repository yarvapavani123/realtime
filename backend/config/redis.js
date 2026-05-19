const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

(async () => {
  try {
    await client.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.log("Redis Connection Failed");
  }
})();

module.exports = client;