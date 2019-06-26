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