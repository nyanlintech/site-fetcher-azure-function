const { app } = require("@azure/functions");
const { Client } = require("pg");

app.timer("dbKeepWarm", {
  schedule: "0 */5 * * * *",
  handler: async (myTimer, context) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 10000,
    });
    try {
      await client.connect();
      await client.query("SELECT 1");
      context.log("DB ping ok");
    } catch (err) {
      context.error(`DB ping failed: ${err.message}`);
    } finally {
      await client.end();
    }
  },
});
