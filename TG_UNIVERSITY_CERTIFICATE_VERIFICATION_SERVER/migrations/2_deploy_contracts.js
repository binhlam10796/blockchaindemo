var DegreeKind = artifacts.require("./DegreeKindStorage");
var DegreeName = artifacts.require("./DegreeNameStorage");
var Certificate = artifacts.require("./CertificateStorage");
var History = artifacts.require("./DegreeHistory");
var User = artifacts.require("./UserManagementStorage");
var School = artifacts.require("./SchoolStorage");

module.exports = function(deployer){
	deployer.deploy(DegreeKind);
	deployer.deploy(DegreeName);
	deployer.deploy(Certificate);
	deployer.deploy(History);
	deployer.deploy(User);
	deployer.deploy(School);
};


