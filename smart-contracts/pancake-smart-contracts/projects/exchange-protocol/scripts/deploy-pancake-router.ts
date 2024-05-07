import { ethers, network, run } from "hardhat";

const factoryAddress = "0x0DD754099a9189eF1D55D4719f9C7d6D6A25E1E4"
const ETHAddress = "0x94373a4919B3240D86eA41593D5eBa789FEF3848"

const deploy = async (): Promise<string> => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const networkName = network.name;

  // Sanity checks
  if (networkName === "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  } else if (!process.env.KEY_TESTNET) {
    throw new Error("Missing private key, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy PancakeRouter
  console.log("Deploying PancakeRouter..");

  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");

  const PancackeRouter = await PancakeRouter.deploy(factoryAddress, ETHAddress);

  await PancackeRouter.deployed();

  console.log("PancackeRouter deployed to:", PancackeRouter.address);
  return PancackeRouter.address;
}

const verify = async (address:string, parameter:any[] = []) => {
  console.log(`Veryfing ${address} ...`)
  await run('verify:verify', {
    address: address,
    constructorArguments: parameter
  })
  console.log("Success!")
}

const main = async () => {
  const contractAddr = await deploy();
  await verify(
  contractAddr, 
  [factoryAddress, ETHAddress]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
