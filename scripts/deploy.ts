import { ethers, run, network } from "hardhat"

/*
to run this script do 'yarn hardhat run scripts/deploy.js'
to run with a particular network `yarn hardhat run scripts/deploy.js --network hardhart`
 */ 
const main = async() => {
  try {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed() 
    console.log(`deployed contract to ${simpleStorage.address}`) 

    // get favourite Number
    const favouriteNumber = await simpleStorage.retrieve()
    console.log(`The current Favourite Number is ${favouriteNumber.toString()}`)
    // store favourite Number
    const transactionResponse = await simpleStorage.store("7")
    await transactionResponse.wait(1)
    // get updated favourite Number
    const updatedFavouriteNumber = await simpleStorage.retrieve()
    console.log(`The updated Favourite Number is ${updatedFavouriteNumber.toString()}`)

    //verify contract
    if(network.config.chainId===5 && process.env.ETHERSCAN_API_KEY){
      /* To make sure that etherscan is aware of the contract before verification
       we allow some blocks(6 blocks) to be mined first */
      console.log('waiting for 6 blocks confirmation...')
      await simpleStorage.deployTransaction.wait(6)     
      await verify(simpleStorage.address, [])
    }

  } catch (error) {
    console.log(error)
  }
 
}

// to verify the contract on etherscan
const verify = async(contractAddress:string, args:any[]) => {
  console.log('verifying contract')
  try {
    await run("verify:verify",{
      address:contractAddress,
      constructorArguments: args
    })
  } catch (error:any) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log('Already Verified')
    }else{
      console.log(error)
    }
  }
  
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error)
    process.exit(1)
})