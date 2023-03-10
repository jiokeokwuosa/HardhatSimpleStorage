import { task } from "hardhat/config"

export default task("block-number", "Prints the current block number").setAction(
    // hre is hardhT runtime environment
    async(tasksArg, hre) =>{
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is ${blockNumber}`)
    }
)
