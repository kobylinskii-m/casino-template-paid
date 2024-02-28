const dotenv = require("dotenv");

// Load env vars if env is not production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./server/config/local.env" });
}

module.exports = {
  PORT: process.env.PORT || 7777,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  INITIAL_CHIPS_AMOUNT: 100000,
  NODE_BLOCKCHAIN_HTTP_URL: process.env.NODE_BLOCKCHAIN_HTTP_URL,
  BLOCKCHAIN_ERC20_USDT_ADDRESS: process.env.BLOCKCHAIN_ERC20_USDT_ADDRESS,
  NODE_BLOCKCHAIN_WS_URL: process.env.NODE_BLOCKCHAIN_WS_URL,
};
