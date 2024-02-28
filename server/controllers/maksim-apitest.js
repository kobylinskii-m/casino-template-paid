const { validationResult } = require("express-validator");
const { usdtContract } = require("../web3/contracts/usdt-contract");

// @route   GET api/maksim-apitest/get-wallet-balance
// @desc    Get Get the current wallet balance
// @access  Private
exports.getWalletBalance = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const balance = await usdtContract.getBalance(req.body.address);
    res.status(400).json({
      usdt: {
        balance,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};

// @route   GET api/maksim-apitest/stream/wallet-balance
// @desc    Stream to get the current wallet balance
// An example of an sse implementation to track changes in the balance on the wallet.
// @access  Private
exports.streamWalletBalance = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  try {
    const listing = (balance) => {
      const data = `data: ${JSON.stringify({
        usdt: {
          balance,
        },
      })}\n\n`;
      res.write(data);
    };

    listing(await usdtContract.getBalance(req.body.address));

    await usdtContract.onBalance(req.body.address, listing);

    req.on("close", () => {
      console.log(`Connection closed`);
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Internal server error");
  }
};
