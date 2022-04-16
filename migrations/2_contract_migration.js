const XYZToken = artifacts.require("XYZToken");
const Admin = artifacts.require("Admin");

module.exports = async function(deployer) {
  // await deployer.deploy(XYZToken);
  // const token = await XYZToken.deployed();

  await deployer.deploy(Admin);
  const admin = await Admin.deployed();

  //await token.transfer(admin.address, '100000000000000000000000000');
};