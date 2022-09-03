require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",

  gasReporter: {
    enabled: true,
    currency: "USD",
    // outputFile: "gas-report.txt",
    noColors: false,
    coinmarketcap: "78b95322-5831-4339-a7d0-dbfddec9ded2",
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
