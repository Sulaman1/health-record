const { networkConfig, developmentChains } = require("../hardhat-help-config");

const hospital1 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const hospital2 = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
const patient1 = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";
const patient2 = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc";

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  console.log("deployer: ", deployer);

  const chainId = network.config.chainId;

  const argHospital = [hospital1, hospital2];
  const argPatient = [patient1, patient2];

  const healthRecord = await deploy("HealthRecord", {
    from: deployer,
    args: [argHospital, argPatient],
    log: true,
  });
  console.log("Health Record address: ", healthRecord.address);
};

module.exports.tags = ["all", "healthrecord"];
