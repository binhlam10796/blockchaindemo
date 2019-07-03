var KindStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_degreeKindId",
				"type": "address"
			}
		],
		"name": "deleteDegreeKind",
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
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"name": "_degreeKindName",
				"type": "string"
			}
		],
		"name": "updateDegreeKindName",
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
		"name": "getDegreeKindAtIndex",
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
		"constant": false,
		"inputs": [
			{
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"name": "_degreeKindName",
				"type": "string"
			}
		],
		"name": "InsertDegreeKind",
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
				"name": "_degreeKindId",
				"type": "address"
			}
		],
		"name": "getDegreeKind",
		"outputs": [
			{
				"name": "degreeKindId",
				"type": "address"
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
		"constant": true,
		"inputs": [],
		"name": "getDegreeKindCount",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_degreeKindName",
				"type": "string"
			}
		],
		"name": "LeaderUpdatedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_degreeKindId",
				"type": "address"
			}
		],
		"name": "CountryDeleteEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_degreeKindName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "SetDegreeKindEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetDeleteDegreeKind",
		"type": "event"
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
				"name": "nguoitt",
				"type": "address"
			},
			{
				"name": "idCer",
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
				"name": "nguoitt",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "idCer",
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
		"inputs": [],
		"name": "getHisCount",
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
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHisIndex",
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
				"name": "nguoitt",
				"type": "address"
			},
			{
				"name": "idCer",
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
		"inputs": [
			{
				"name": "_degreeKindId",
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
				"name": "_degreeKindId",
				"type": "address"
			}
		],
		"name": "deleteDegreeKind",
		"outputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "_fax",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "phone",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "string"
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

var NameStorageABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_degreeNameId",
				"type": "address"
			}
		],
		"name": "getSchoolAddition",
		"outputs": [
			{
				"name": "degreeNameId",
				"type": "address"
			},
			{
				"name": "degreeKindId",
				"type": "address"
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
				"name": "_degreeKindId",
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
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getDegreeNameAtIndex",
		"outputs": [
			{
				"name": "_degreeNameId",
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
				"name": "_degreeNameId",
				"type": "address"
			}
		],
		"name": "deleteDegreeName",
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
				"name": "_degreeNameId",
				"type": "address"
			},
			{
				"name": "_degreeName",
				"type": "string"
			}
		],
		"name": "updateDegreeName",
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
				"name": "_degreeNameId",
				"type": "address"
			},
			{
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"name": "_degreeName",
				"type": "string"
			}
		],
		"name": "InsertDegreeName",
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
		"inputs": [],
		"name": "getDegreeNameCount",
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
				"name": "_degreeNameId",
				"type": "address"
			},
			{
				"name": "_degreeKindId",
				"type": "address"
			}
		],
		"name": "updateDegreeKindName",
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
				"name": "_degreeNameId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_degreeKindId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_degreeName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetDegreeNameEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_degreeNameId",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetDeleteDegreeName",
		"type": "event"
	}
];

var HistotyStorageABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idHistory",
				"type": "address"
			},
			{
				"name": "_taiKhoan",
				"type": "address"
			},
			{
				"name": "_thaoTac",
				"type": "string"
			},
			{
				"name": "_ngay",
				"type": "string"
			}
		],
		"name": "InsertHistory",
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
				"name": "_idHistory",
				"type": "address"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"name": "taiKhoan",
				"type": "address"
			},
			{
				"name": "thaoTac",
				"type": "string"
			},
			{
				"name": "ngay",
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
		"name": "getHistoryAtIndex",
		"outputs": [
			{
				"name": "idHistory",
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
		"name": "getHistoryCount",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_idHistory",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_taiKhoan",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_thaoTac",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_ngay",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "SetHistoryEvent",
		"type": "event"
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
				"name": "_fax",
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
				"type": "string"
			},
			{
				"name": "phone",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_phone",
				"type": "string"
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
		"anonymous": false,
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
				"name": "_addr",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_fax",
				"type": "string"
			},
			{
				"name": "_phone",
				"type": "string"
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
				"indexed": false,
				"name": "_phone",
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
		"name": "SetSchoolEvent",
		"type": "event"
	},
	{
		"constant": true,
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
		"constant": true,
		"inputs": [
			{
				"indexed": false,
				"name": "_schoolAddress",
				"type": "address"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "string"
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


var UserManagementStorageABI = [
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
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_job",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
		"constant": false,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_dateOfBirth",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"type": "string"
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
				"name": "_isLocked",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
		"name": "getUserDetailMoreMore",
		"outputs": [
			{
				"name": "_phoneNumber",
				"type": "string"
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
				"name": "_idCardIssuePlace",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_userAddr",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_password",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_idCardNo",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "_modifiedTime",
				"type": "string"
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
				"type": "string"
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
				"type": "string"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_modifiedTime",
				"type": "string"
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
				"type": "string"
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
				"type": "string"
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
				"type": "string"
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
				"name": "_fax",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "phone",
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
				"name": "_schoolAddress",
				"type": "address"
			},
			{
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "string"
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
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_phone",
				"type": "string"
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