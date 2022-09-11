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

  it("add patient", async () => {
    console.log("PAT: ", pat3.address)
    await healthRecord.addPatient(pat3.address);
    let newPatient = await healthRecord.isPatient(pat3.address);
    console.log("NEW PATIENT: ", newPatient);
    // assert(newHospital).to.be.equals(true);
    assert.equal(newPatient, true);
  });

  it("add Record", async () => {
    console.log("PAT: ", pat3.address)
    var diag = {
      patientID: 0,
      allergies: "none",
      geneticDisease: "migraine",
      medicalReport: "migraine"
    }
    await healthRecord.addRecord("NoorUlAin", pat1.address, hos1.address, 2022, 2023, "Migraine", diag);
    var count = await healthRecord.recordCount();
    console.log("Record:", count)  
    // assert(newHospital).to.be.equals(true);
    assert.equal(count, 1);
  });
  
});


describe("Get Record", function(){
  let healthRecord;
  let chainId;
  let deployer, acc1, acc2, hos1, hos2, hos3, pat1, pat2, pat3;

  beforeEach(async()=>{
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

    var diag = {
      patientID: 0,
      allergies: "none",
      geneticDisease: "migraine",
      medicalReport: "migraine"
    }
    await healthRecord.addRecord("NoorUlAin", pat1.address, hos1.address, 2022, 2023, "Migraine", diag);
    var count = await healthRecord.recordCount();
    console.log("Record:", count)
  })


   it("should get Own Record", async () => {
    expect(await healthRecord.connect(pat1).getOwnRecord(0, pat1.address))
    // var diag = await healthRecord.connect(pat1).getOwnRecord(0, pat1.address);
    // console.log("Patient Diagnostics: ", diag);
    // assert(newHospital).to.be.equals(true);
    // assert.equal(newHospital, true);
  });


  it("Hospital should get Record", async () => {
    // var diag = await healthRecord.connect(hos1).getRecord(0, pat1.address);
    // console.log("Hospital Get Patient Diagnostics: ", diag);
    // assert(newHospital).to.be.equals(true);
    // assert.equal(newHospital, true);
    expect(await healthRecord.connect(hos1).getRecord(0, pat1.address))
  });


});