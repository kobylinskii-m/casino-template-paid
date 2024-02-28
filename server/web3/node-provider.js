const ethers = require("ethers");
const {
  NODE_BLOCKCHAIN_HTTP_URL,
  NODE_BLOCKCHAIN_WS_URL,
} = require("../config");

exports.httpNodeProvider = new ethers.providers.JsonRpcProvider(
  NODE_BLOCKCHAIN_HTTP_URL
);

exports.wsNodeProvider = new ethers.providers.WebSocketProvider(
  NODE_BLOCKCHAIN_WS_URL
);
