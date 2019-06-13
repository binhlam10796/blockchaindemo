var KindStorageABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getDegreeKindIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_degreeKindId",
				"type": "uint8"
			}
		],
		"name": "getDegreeKind",
		"outputs": [
			{
				"name": "degreeKindId",
				"type": "uint8"
			},
			{
				"name": "degreeKindName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_degreeKindId",
				"type": "uint8"
			},
			{
				"name": "_degreeKindName",
				"type": "string"
			}
		],
		"name": "setDegreeKind",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

var NameStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_degreeKindId",
				"type": "uint256"
			},
			{
				"name": "_degreeNameId",
				"type": "uint256"
			},
			{
				"name": "_degreeName",
				"type": "string"
			}
		],
		"name": "setDegreeName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getDegreeNameIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_degreeNameId",
				"type": "uint256"
			}
		],
		"name": "getDegreeName",
		"outputs": [
			{
				"name": "degreeKindId",
				"type": "uint256"
			},
			{
				"name": "degreeNameId",
				"type": "uint256"
			},
			{
				"name": "degreeName",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var CertificateStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "status",
				"type": "string"
			}
		],
		"name": "approveCertificate",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "universityName",
				"type": "string"
			},
			{
				"name": "typeOfDegree",
				"type": "string"
			},
			{
				"name": "major",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "setCertificate",
		"outputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"name": "status",
				"type": "string"
			},
			{
				"name": "yearOfGraduation",
				"type": "uint256"
			},
			{
				"name": "degreeClassification",
				"type": "string"
			}
		],
		"name": "setCertificateAddition",
		"outputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "modeOfStudy",
				"type": "string"
			},
			{
				"name": "certificateDeliveryDate",
				"type": "string"
			},
			{
				"name": "number",
				"type": "uint256"
			},
			{
				"name": "regNo",
				"type": "string"
			}
		],
		"name": "setCertificateAdditionDetail",
		"outputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "rdid",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "universityName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "typeOfDegree",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "major",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			}
		],
		"name": "setCertificateEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "rdid",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "yearOfGraduation",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "degreeClassification",
				"type": "string"
			}
		],
		"name": "setCertificateAdditionEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "rdid",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "modeOfStudy",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "certificateDeliveryDate",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "regNo",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "setCertificateAdditionEventDetail",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "thaotac",
				"type": "string"
			},
			{
				"name": "createTimeCertificate",
				"type": "string"
			},
			{
				"name": "comment",
				"type": "string"
			}
		],
		"name": "setHistoryCer",
		"outputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "rdhid",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "thaotac",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "createTimeCertificate",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "comment",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "setHistoryEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "rdid",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "universityName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "typeOfDegree",
				"type": "string"
			}
		],
		"name": "updateStatus",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "major",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "string"
			}
		],
		"name": "updateStatusAddition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "yearOfGraduation",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "degreeClassification",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "modeOfStudy",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "certificateDeliveryDate",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "regNo",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "updateStatusAdditionDetail",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_rdid",
				"type": "address"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "universityName",
				"type": "string"
			},
			{
				"name": "typeOfDegree",
				"type": "string"
			},
			{
				"name": "major",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_rdid",
				"type": "address"
			}
		],
		"name": "getCertificateAddition",
		"outputs": [
			{
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"name": "status",
				"type": "string"
			},
			{
				"name": "yearOfGraduation",
				"type": "uint256"
			},
			{
				"name": "degreeClassification",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_rdid",
				"type": "address"
			}
		],
		"name": "getCertificateAdditionDetail",
		"outputs": [
			{
				"name": "modeOfStudy",
				"type": "string"
			},
			{
				"name": "certificateDeliveryDate",
				"type": "string"
			},
			{
				"name": "number",
				"type": "uint256"
			},
			{
				"name": "regNo",
				"type": "string"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getCertificateIndex",
		"outputs": [
			{
				"name": "_id",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_rdid",
				"type": "address"
			}
		],
		"name": "getHistoryCertificate",
		"outputs": [
			{
				"name": "rdid",
				"type": "address"
			},
			{
				"name": "thaotac",
				"type": "string"
			},
			{
				"name": "createTimeCertificate",
				"type": "string"
			},
			{
				"name": "comment",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "address"
			}
		],
		"name": "isUser",
		"outputs": [
			{
				"name": "isIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var UserManagementStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_dateOfBirth",
				"type": "uint256"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateDateOfBirth",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "isUser",
		"outputs": [
			{
				"name": "isIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateIdCardNo",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_isLocked",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			},
			{
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"name": "_idCardIssuePlace",
				"type": "string"
			}
		],
		"name": "insertUserDetail",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "deleteUser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"name": "_job",
				"type": "string"
			},
			{
				"name": "_userAddr",
				"type": "string"
			}
		],
		"name": "insertUserDetailFlus",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_idCardIssuePlace",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateIdCardIssuePlace",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateEmail",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_userId",
				"type": "string"
			},
			{
				"name": "_fullName",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_password",
				"type": "string"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "insertUser",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "_userId",
				"type": "string"
			},
			{
				"name": "_fullName",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_password",
				"type": "string"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_dateOfBirth",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserDetailMoreMore",
		"outputs": [
			{
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"name": "_job",
				"type": "string"
			},
			{
				"name": "_userAddr",
				"type": "string"
			},
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateGender",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_job",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateJob",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_password",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updatePassword",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_isLocked",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateIsLocked",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_fullName",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateFullName",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_userAddr",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updateUserAddr",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserDetailMore",
		"outputs": [
			{
				"name": "_isLocked",
				"type": "string"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			},
			{
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"name": "_idCardIssuePlace",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"name": "_createdTime",
				"type": "uint256"
			}
		],
		"name": "updatePhoneNumber",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getUserAtIndex",
		"outputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_userId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_fullName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_password",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_gender",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "SetUserManagementEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_isLocked",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_createdTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_modifiedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_idCardIssuePlace",
				"type": "string"
			}
		],
		"name": "SetUserManagementAdditionEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_job",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_userAddr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "SetUserManagementAdditionFlusEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_userId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_fullName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_password",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_gender",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "SetLogUpdateUserManagementEven",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_isLocked",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_modifiedTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_createdTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_idCardIssuePlace",
				"type": "string"
			}
		],
		"name": "SetLogUpdateUserManagementAdditionEven",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_phoneNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_job",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_userAddr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "SetLogUpdateUserManagementAdditionFlusEven",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeleteUserManagement",
		"type": "event"
	}
];