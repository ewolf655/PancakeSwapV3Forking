import * as dotenv from 'dotenv';
dotenv.config();
import { ethers, network } from 'hardhat'
import { RouterParametersStruct } from '../typechain-types/contracts/UniversalRouter';

const routerParam: RouterParametersStruct = {
  	permit2: "0xadd7f8988A9BEd0e8C6234FA688df421ab2DD980",
	weth9: "0x94373a4919B3240D86eA41593D5eBa789FEF3848",
	seaportV1_5: "0x0000000000000000000000000000000000000000",
	seaportV1_4: "0x0000000000000000000000000000000000000000",
	openseaConduit: "0x0000000000000000000000000000000000000000",
	x2y2: "0x0000000000000000000000000000000000000000",
	looksRareV2: "0x0000000000000000000000000000000000000000",
	routerRewardsDistributor: "0x0000000000000000000000000000000000000000",
	looksRareRewardsDistributor: "0x0000000000000000000000000000000000000000",
	looksRareToken: "0x0000000000000000000000000000000000000000",
	v2Factory: "0x0DD754099a9189eF1D55D4719f9C7d6D6A25E1E4",
	v3Factory: "0xd1F483B7BFb8cBd761915097885B49Fe77117A7A",
	v3Deployer: "0x2b7D629314653d135209Cc3DEDB93364851F9760",
	v2InitCodeHash: "0xa5934690703a592a07e841ca29d5e5c79b5e22ed4749057bb216dc31100be1c0",
	v3InitCodeHash: "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
	stableFactory: "0xa45096DFD27571e1f5421Cca028f76Cc65bc059C",
	stableInfo: "0x67861260bc85Fd6C3F6eb2BF213a40AEe70a1B27",
	pancakeNFTMarket: "0x0000000000000000000000000000000000000000",
}

async function main() {
  const networkName = network.name
  console.log(`Deploying UniversalRouter to ${networkName} ...`)
  const UniswapRouterFactory = await ethers.getContractFactory("UniversalRouter")
  const uniswapRouter = await UniswapRouterFactory.deploy(routerParam);
  console.log("UniversalRouter deployed to: ", await uniswapRouter.getAddress())
}

main()