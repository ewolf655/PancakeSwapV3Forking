import { verifyContract } from '../common/verify'
import { sleep } from "../common/sleep"

async function main() {
    console.log('Verify PancakeInterfaceMulticallV2');
    await verifyContract("0xD5978628572D45B00c97Fd22730Ced8F6910284D");
    await sleep(10000);
    
    console.log('Verify Multicall3');
    await verifyContract("0xb888D5fc98C7ff63B0EecC929238813cb02f2aB4");
    await sleep(10000);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })