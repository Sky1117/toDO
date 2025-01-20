import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
require("dotenv").config();

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not defined in the environment variables");
}

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    holesky: {
      url: process.env.HOLESKY_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gas: 50000000,
    },
  },
};

export default config;
