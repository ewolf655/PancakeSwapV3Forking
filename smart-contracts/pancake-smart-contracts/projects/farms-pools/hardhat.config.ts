import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";

const bscTestnet: NetworkUserConfig = {
  url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
};

const bscMainnet: NetworkUserConfig = {
  url: "https://bsc-dataseed.binance.org/",
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
};

const amoyTestnet: NetworkUserConfig = {
  url: "https://polygon-amoy-bor-rpc.publicnode.com",
  chainId: 80002,
  accounts: [process.env.KEY_TESTNET!],
  timeout: 20000000,
  gasPrice: 30000000000,
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { amoyTestnet }),
    amoyTestnet: amoyTestnet,
  },
  etherscan: {
    apiKey: {
      amoyTestnet: process.env.OKLINK_API_KEY!
    },
    customChains: [
      {
        network: 'amoyTestnet',
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      }
    ]
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 99999,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  abiExporter: {
    path: "./data/abi",
    clear: true,
    flat: false,
  },
};

export default config;
