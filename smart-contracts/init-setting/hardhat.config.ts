import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: require("find-config")(".env") });

const pulseTestnet: NetworkUserConfig = {
	url: "https://rpc.v4.testnet.pulsechain.com",
	chainId: 943,
	accounts: [process.env.KEY_PULSE_TESTNET!],
};

const holesky: NetworkUserConfig = {
	url: "https://ethereum-holesky-rpc.publicnode.com",
	chainId: 17000,
	accounts: ["f463626a10cb4b95cb0a0f60e083500f991a3187b1a016f596415619e5c40819"],
};

const config: HardhatUserConfig = {
	solidity: "0.8.24",
	networks: {
		hardhat: {
			allowUnlimitedContractSize: true,
		},
		...(process.env.KEY_PULSE_TESTNET && { pulseTestnet }),
		...("V15EU4CM82WSXB4WE6CXYGTK8PX5IH63Q6" && { holesky }),
	},
  etherscan: {
    apiKey: {
      mainnet: "2VPQC6NNB1AEJI2P3GQA73C9UZ823EFY3F",
      bsctestnet: "HDCD9C44C7YRZGHE48WGHGUZW5DU1R2WKT",
      bsc: "HDCD9C44C7YRZGHE48WGHGUZW5DU1R2WKT",
      pulseTestnet: "0000000000000000000000000000000000",
      mumbai: "KMUEE12BAEC489N8J76FKZYA7ZKNRQMVZ4",
      holesky: "V15EU4CM82WSXB4WE6CXYGTK8PX5IH63Q6"
    },
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io"
        }
      },
    ]
  },
};

export default config;