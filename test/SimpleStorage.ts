import { assert } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage,  SimpleStorage__factory} from '../typechain-types'

describe("SimpleStorage",function(){
  let simpleStorage:SimpleStorage
  let SimpleStorageFactory:SimpleStorage__factory

  beforeEach(async function(){
    SimpleStorageFactory = (await ethers.getContractFactory("SimpleStorage") ) as SimpleStorage__factory  
    simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed() 
  })

  it("Should have initial favourite number to be 0", async function(){
    const favouriteNumber = await simpleStorage.retrieve()
    const expectedValue = '0'

    assert.equal(favouriteNumber.toString(), expectedValue)
  })
  // if i want to run only a particular test use `it.only` instead of `it`
  it("Should update favourite number when we call store", async function(){
    const expectedValue = '5'
    const transactionResponse = await simpleStorage.store("5")
    await transactionResponse.wait(1)
    const favouriteNumber = await simpleStorage.retrieve()

    assert.equal(favouriteNumber.toString(), expectedValue)
  })

  it("Should update favourite number when we call store", async function(){
    const expectedValue = '5'
    const transactionResponse = await simpleStorage.store("5")
    await transactionResponse.wait(1)
    const favouriteNumber = await simpleStorage.retrieve()   
 
    assert.equal(favouriteNumber.toString(), expectedValue)
  })
  
})