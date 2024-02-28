const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getWalletBalance,
  streamWalletBalance,
} = require("../../controllers/maksim-apitest");

router.post(
  "/get-wallet-balance",
  [check("address", "Wallet address is required").not().isEmpty()],
  getWalletBalance
);

router.post(
  "/stream/wallet-balance",
  [check("address", "Wallet address is required").not().isEmpty()],
  streamWalletBalance
);

module.exports = router;
