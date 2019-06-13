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
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getCertificateAddition",
		"outputs": [
			{
				"name": "id",
				"type": "string"
			},
			{
				"name": "yearOfGraduation",
				"type": "uint256"
			},
			{
				"name": "degreeClassification",
				"type": "string"
			},
			{
				"name": "modeOfStudy",
				"type": "string"
			},
			{
				"name": "certificateDeliveryDate",
				"type": "uint256"
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
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_universityName",
				"type": "string"
			},
			{
				"name": "_typeOfDegree",
				"type": "string"
			},
			{
				"name": "_major",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_dateOfBirth",
				"type": "uint256"
			},
			{
				"name": "_status",
				"type": "string"
			},
			{
				"name": "_yearOfGraduation",
				"type": "uint256"
			},
			{
				"name": "_degreeClassification",
				"type": "string"
			},
			{
				"name": "_modeOfStudy",
				"type": "string"
			},
			{
				"name": "_certificateDeliveryDate",
				"type": "uint256"
			},
			{
				"name": "_number",
				"type": "uint256"
			},
			{
				"name": "_regNo",
				"type": "string"
			}
		],
		"name": "setCertificate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getUserConfirmCertificatioin",
		"outputs": [
			{
				"name": "userId",
				"type": "string"
			},
			{
				"name": "userName",
				"type": "string"
			},
			{
				"name": "dateTime",
				"type": "uint256"
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
		"constant": false,
		"inputs": [
			{
				"name": "_userId",
				"type": "string"
			},
			{
				"name": "_userName",
				"type": "string"
			},
			{
				"name": "_dateTime",
				"type": "uint256"
			},
			{
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "setUserConfirmCertificate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCertificateIndex",
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
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"name": "id",
				"type": "string"
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
			},
			{
				"name": "dateOfBirth",
				"type": "uint256"
			},
			{
				"name": "status",
				"type": "string"
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
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_universityName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_typeOfDegree",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_major",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_dateOfBirth",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_status",
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
				"indexed": false,
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_yearOfGraduation",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_degreeClassification",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_modeOfStudy",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_certificateDeliveryDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_regNo",
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
				"indexed": false,
				"name": "_userId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_userName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_dateTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "setUserConfirmCertificateEvent",
		"type": "event"
	}
];
var UserManagementStorageABI = [
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
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_fax",
				"type": "uint256"
			},
			{
				"name": "_phone",
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
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
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
				"name": "_islocked",
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
			},
			{
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			}
		],
		"name": "updateAddr",
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
				"name": "_modifiedTime",
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
				"name": "_fax",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			}
		],
		"name": "updateFax",
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
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
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
				"name": "_islocked",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			}
		],
		"name": "updateIslocked",
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
				"name": "_phone",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			}
		],
		"name": "updatePhone",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "addr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "fax",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "phone",
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
				"name": "_isLocked",
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
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "addr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "fax",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "phone",
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
				"name": "_isLocked",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeleteUserManagement",
		"type": "event"
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
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_fax",
				"type": "uint256"
			},
			{
				"name": "_phone",
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
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserDetailMore",
		"outputs": [
			{
				"name": "_createdTime",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "uint256"
			},
			{
				"name": "_islocked",
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
	}
];
var SchoolStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_islocked",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			}
		],
		"name": "updateIslocked",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_createdTime",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			},
			{
				"name": "_islocked",
				"type": "string"
			}
		],
		"name": "insertSchoolAddition",
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
				"name": "_schoolAddress",
				"type": "address"
			}
		],
		"name": "getSchoolAddition",
		"outputs": [
			{
				"name": "_createdTime",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			},
			{
				"name": "_islocked",
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
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getSchoolAtIndex",
		"outputs": [
			{
				"name": "SchoolAddress",
				"type": "address"
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_phone",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			}
		],
		"name": "updatePhone",
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
				"name": "_schoolAddress",
				"type": "address"
			}
		],
		"name": "getSchool",
		"outputs": [
			{
				"name": "SchoolAddress",
				"type": "address"
			},
			{
				"name": "id",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "addr",
				"type": "string"
			},
			{
				"name": "fax",
				"type": "uint256"
			},
			{
				"name": "phone",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_fax",
				"type": "uint256"
			},
			{
				"name": "_phone",
				"type": "uint256"
			}
		],
		"name": "insertSchool",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			}
		],
		"name": "updateAddr",
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
				"name": "_schoolAddress",
				"type": "address"
			}
		],
		"name": "deleteSchool",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_fax",
				"type": "uint256"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
			}
		],
		"name": "updateFax",
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
		"name": "getSchoolCount",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_addr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_fax",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "uint256"
			}
		],
		"name": "SetSchoolEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_createdTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_modifiedTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_isLocked",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "SetSchoolAdditionEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_id",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_addr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_fax",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "uint256"
			}
		],
		"name": "SetLogUpdateSchoolEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_createdTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_modifiedTime",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_isLocked",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "SetLogUpdateSchoolAdditionEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetLogDeleteSchool",
		"type": "event"
	}
];