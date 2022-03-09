const StorageWithHistory = artifacts.require("StorageWithHistory");

module.exports = function (deployer) {
  deployer.deploy(StorageWithHistory);
};