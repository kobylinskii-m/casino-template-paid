const ethers = require("ethers");
const { ERC20_ABI } = require("../../config/erc20-abi");
const { BLOCKCHAIN_ERC20_USDT_ADDRESS } = require("../../config");
const { wsNodeProvider } = require("../node-provider");

class UsdtContract {
  constructor() {
    this.contract = new ethers.Contract(
      BLOCKCHAIN_ERC20_USDT_ADDRESS,
      ERC20_ABI,
      wsNodeProvider
    );
  }

  async getBalance(address) {
    const balance = await this.contract.balanceOf(address);
    const decimals = await this.getDecimals();
    return ethers.utils.formatUnits(balance, decimals);
  }

  async getDecimals() {
    //TODO: Add caching for the query or add the decimals variable to env.
    // The decimals cannot change after the contract is deployed
    return await this.contract.decimals();
  }

  async onBalance(address, fcListing) {
    this.contract.on("Transfer", async (from, to, amount) => {
      if (
        to.toLowerCase() === address.toLowerCase() ||
        from.toLowerCase() === address.toLowerCase()
      ) {
        const balance = await this.getBalance(address);
        await fcListing(balance);
      }
    });
  }
}

exports.usdtContract = new UsdtContract();
