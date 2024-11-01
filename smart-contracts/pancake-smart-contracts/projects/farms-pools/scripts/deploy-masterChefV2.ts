import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import config from "../config";
// const config = require("../config");
const currentNetwork = network.name;

async function main() {

  console.log("Deploying to network:", currentNetwork);

  let masterChefV1Address: string;

  masterChefV1Address = "0x0c74FC96Acd1900eEd71F271B7a6287476B3A02a";
  console.log("Deploying MasterChefV2...");

  const MasterChef = await ethers.getContractFactory("MasterChefV2");

  const masterChef = await MasterChef.deploy(
    masterChefV1Address,
    config.StakedToken[currentNetwork],
    0,
    config.Admin[currentNetwork]
  );

  console.log("MasterChefV2 deployed to:", masterChef.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
