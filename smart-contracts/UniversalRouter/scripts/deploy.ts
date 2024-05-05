import * as dotenv from 'dotenv';
dotenv.config();
import { ethers, network } from 'hardhat'
import { RouterParametersStruct } from '../typechain-types/contracts/UniversalRouter';

const routerParam: RouterParametersStruct = {
  permit2: "0xEE6c464DBF1c14987ECC2cAC2CF367EBbE404EA0",
  weth9: "0x6B5817E7091BC0C747741E96820b0199388245EA",
  seaportV1_5: "0x0000000000000000000000000000000000000000",
  seaportV1_4: "0x0000000000000000000000000000000000000000",
  openseaConduit: "0x0000000000000000000000000000000000000000",
  x2y2: "0x0000000000000000000000000000000000000000",
  looksRareV2: "0x0000000000000000000000000000000000000000",
  routerRewardsDistributor: "0x0000000000000000000000000000000000000000",
  looksRareRewardsDistributor: "0x0000000000000000000000000000000000000000",
  looksRareToken: "0x0000000000000000000000000000000000000000",
  v2Factory: "0x85d309B43D2cd964D34f59Fd2612487F923e7D91",
  v3Factory: "0xDbD5C4d435E41CB5eC0E0319e1cCCc65521C4B68",
  v3Deployer: "0x3AD5Fbea9fbdD5C7F0fBeFF81D100B929AF8ca30",
  v2InitCodeHash: "0xa5934690703a592a07e841ca29d5e5c79b5e22ed4749057bb216dc31100be1c0",
  v3InitCodeHash: "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
  stableFactory: "0xCc25a2340598DaD00fba88Ff9628dDA376b46a72",
  stableInfo: "0x23FA6819B860d366D8D1b8D308Be0135Ac750a9F",
  pancakeNFTMarket: "0x0000000000000000000000000000000000000000"
}

async function main() {
	const networkName = network.name;
	console.log(`Deploying UniversalRouter to ${networkName} ...`);
	const UniswapRouterFactory = await ethers.getContractFactory(
		"UniversalRouter",
	);
  const uniswapRouter = await UniswapRouterFactory.deploy(routerParam);
	console.log(
		"UniversalRouter deployed to: ",
		await uniswapRouter.getAddress(),
	);
}

main();
