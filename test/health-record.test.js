const { getNamedAccounts, ethers, network } = require("hardhat");
const { expect, assert } = require("chai");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../hardhat-help-config");

describe("HealthRecord", function () {
  let healthRecord;
  let chainId;
  let deployer, acc1, acc2, hos1, hos2, hos3, pat1, pat2, pat3;

  let sendAmount = ethers.utils.parseEther("0.04");
  let lessAmount = ethers.utils.parseEther("0.002");

  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    [acc1, acc2, hos1, hos2, hos3, pat1, pat2, pat3] =
      await ethers.getSigners();
    let hos = [hos1.address, hos2.address];
    let pat = [pat1.address, pat2.address];
    chainId = network.config.chainId;
    console.log("chain id: ", chainId);

    const HealthRecord = await hre.ethers.getContractFactory("HealthRecord");
    healthRecord = await HealthRecord.deploy(hos, pat);
    await healthRecord.deployed();
  });

  it("should not add hospital", async () => {
    await expect(healthRecord.addHospital(hos1.address)).to.be.revertedWith(
      "hospitalDoesNotExist"
    );
  });

  it("should add hospital", async () => {
    await healthRecord.addHospital(hos3.address);
    let newHospital = await healthRecord.isHospital(hos3.address);
    console.log("NEW HOSPITAL: ", newHospital);
    // assert(newHospital).to.be.equals(true);
    assert.equal(newHospital, true);
  });

  //   it("should return eth to dollar", async () => {
  //     const e = await chainlinkPriceFeed.ethToDollar("1");
  //     console.log("dollar: ", e.toString());
  //   });

  //   it("Should fund", async () => {
  //     await chainlinkPriceFeed.getFiatPrice({ value: sendAmount });

  //     const len = await chainlinkPriceFeed.funderArraySize();
  //     console.log(`
  //         length : ${len}
  //     `);
  //     assert.equal(len.toString(), "1");
  //     const val = await chainlinkPriceFeed.getFunderToAmount(deployer);
  //     assert.equal(val.toString(), sendAmount.toString());
  //     const funderAdd = await chainlinkPriceFeed.getFunderAddress(0);
  //     assert.equal(funderAdd, deployer);
  //   });

  //   it("Multiple funders should fund", async () => {
  //     const accounts = await ethers.getSigners();
  //     for (var i = 0; i < 4; i++) {
  //       await chainlinkPriceFeed
  //         .connect(accounts[i])
  //         .getFiatPrice({ value: sendAmount });
  //     }
  //     for (var i = 0; i < 4; i++) {
  //       let amount = await chainlinkPriceFeed.getFunderToAmount(
  //         accounts[i].address
  //       );
  //       assert.equal(amount.toString(), sendAmount.toString());
  //     }
  //     const size = await chainlinkPriceFeed.funderArraySize();
  //     assert.equal(size.toString(), "4");
  //   });

  //   it("One funder should fund multiple times", async () => {
  //     let amount;
  //     for (var i = 0; i < 2; i++) {
  //       await chainlinkPriceFeed
  //         .connect(acc1)
  //         .getFiatPrice({ value: sendAmount });
  //     }
  //     amount = await chainlinkPriceFeed.getFunderToAmount(acc1.address);
  //     assert.equal(amount.toString(), "80000000000000000");
  //   });
});
