    pragma solidity >=0.4.21 <0.6.0;

    contract SchoolStorage {
        //eventInsert
        struct School {
            address SchoolAddress;
            // string id;
            string name;
            string addr;
            string email;
            string fax;
            string phone;

            string createdTime;
            string modifiedTime;
            string islocked;
            uint256 index;
        }
        event SetSchoolEvent(
            address _schoolAddress,
            // string _id,
            string _name,
            string _addr,
            string _email,
            string _fax,
            string _phone);

        event SetSchoolAdditionEvent(
            address _schoolAddress,
            string _createdTime,
            string _modifiedTime,
            string _isLocked,
            uint256 _index);

        //eventUpdate
        event SetLogUpdateSchoolEvent(
            address _schoolAddress,
            // string _id,
            string _name,
            string _addr,
            string _email,
            string _fax,
            string _phone);

        event SetLogUpdateSchoolAdditionEvent(
            address _schoolAddress,
            string _createdTime,
            string _modifiedTime,
            string _isLocked,
            uint256 _index);

        //eventDelete
        event SetLogDeleteSchool(
            address _schoolAddress,
            uint256 index);

        mapping(address => School) SchoolStructsMap;

        address[] SchoolIndex;

        // function isSchool(address _schoolAddress) public view returns(bool isIndeed) {
        //     if(SchoolIndex.length == 0) return false;
        //     return (SchoolIndex[SchoolStructsMap[_schoolAddress].index] == _schoolAddress);
        // }

        function insertSchool(
            address _schoolAddress,
            // string memory _id,
            string memory _name,
            string memory _addr,
            string memory _email,
            string memory _fax,
            string memory _phone
            )
            public returns(uint256 index){
                // SchoolStructsMap[_schoolAddress].id = _id;
                SchoolStructsMap[_schoolAddress].name = _name;
                SchoolStructsMap[_schoolAddress].addr = _addr;
                SchoolStructsMap[_schoolAddress].email = _email;
                SchoolStructsMap[_schoolAddress].fax = _fax;
                SchoolStructsMap[_schoolAddress].phone = _phone;

                emit SetSchoolEvent(_schoolAddress, _name, _addr, _email, _fax, _phone);
            return SchoolIndex.length-1;
        }

        function insertSchoolAddition(
            address _schoolAddress,
            string memory _createdTime,
            string memory _modifiedTime,
            string memory _islocked
            )
            public returns(uint256 index){
                SchoolStructsMap[_schoolAddress].createdTime = _createdTime;
                SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
                SchoolStructsMap[_schoolAddress].islocked = _islocked;
                SchoolStructsMap[_schoolAddress].index = SchoolIndex.push(_schoolAddress)-1;

            emit SetSchoolAdditionEvent(
                _schoolAddress,
                _createdTime,
                _modifiedTime,
                _islocked,
                SchoolStructsMap[_schoolAddress].index);
            return SchoolIndex.length-1;
        }

        function deleteSchool(address _schoolAddress) public returns(uint256 index){
            uint256 rowToDelete = SchoolStructsMap[_schoolAddress].index;
            address keyToMove = SchoolIndex[SchoolIndex.length-1];
            SchoolIndex[rowToDelete] = keyToMove; //vi tri can delete = vi tri cuoi ds
            SchoolStructsMap[keyToMove].index = rowToDelete;

            SchoolIndex.length--;
            emit SetLogDeleteSchool(
                _schoolAddress,
                rowToDelete);

            emit SetLogUpdateSchoolEvent(
                keyToMove,
                // SchoolStructsMap[keyToMove].id,
                SchoolStructsMap[keyToMove].name,
                SchoolStructsMap[keyToMove].email,
                SchoolStructsMap[keyToMove].addr,
                SchoolStructsMap[keyToMove].fax,
                SchoolStructsMap[keyToMove].phone
                );
            emit SetLogUpdateSchoolAdditionEvent(
                keyToMove,
                SchoolStructsMap[keyToMove].createdTime,
                SchoolStructsMap[keyToMove].modifiedTime,
                SchoolStructsMap[keyToMove].islocked,
                rowToDelete
                );
            return rowToDelete;
        }

        function getSchool(address _schoolAddress) public view returns(
                address SchoolAddress,
                // string memory id,
                string memory name,
                string memory email,
                string memory addr,
                string memory fax,
                string memory phone
                ){
                return(
                    _schoolAddress,
                    // SchoolStructsMap[_schoolAddress].id,
                    SchoolStructsMap[_schoolAddress].name,
                    SchoolStructsMap[_schoolAddress].email,
                    SchoolStructsMap[_schoolAddress].addr,
                    SchoolStructsMap[_schoolAddress].fax,
                    SchoolStructsMap[_schoolAddress].phone);
        }

        function getSchoolAddition(address _schoolAddress) public view returns(
            string memory _createdTime,
            string memory _modifiedTime,
            string memory _islocked
            ){
            return(
                SchoolStructsMap[_schoolAddress].createdTime,
                SchoolStructsMap[_schoolAddress].modifiedTime,
                SchoolStructsMap[_schoolAddress].islocked);
        }

        // UPDATE


        function updateFullName(address _schoolAddress, string  memory  _name, string memory _modifiedTime)
        public returns(bool success) {
            SchoolStructsMap[_schoolAddress].name = _name;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function updateEmail(address _schoolAddress, string  memory  _email, string memory _modifiedTime)
        public returns(bool success) {
            SchoolStructsMap[_schoolAddress].email = _email;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function updateAddr(address _schoolAddress, string  memory  _addr, string memory _modifiedTime)
            public returns(bool success) {
            SchoolStructsMap[_schoolAddress].addr = _addr;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function updateFax(address _schoolAddress, string memory _fax, string memory _modifiedTime)
            public returns(bool success) {
            SchoolStructsMap[_schoolAddress].fax = _fax;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function updatePhone(address _schoolAddress, string memory  _phone, string memory _modifiedTime)
            public returns(bool success) {
            SchoolStructsMap[_schoolAddress].phone = _phone;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function updateIslocked(address _schoolAddress, string  memory  _islocked, string memory _modifiedTime)
        public returns(bool success) {
            SchoolStructsMap[_schoolAddress].islocked = _islocked;
            SchoolStructsMap[_schoolAddress].modifiedTime = _modifiedTime;
            return true;
        }

        function getSchoolCount() public view returns(uint256 count){
                return SchoolIndex.length;
            }

        function getSchoolAtIndex(uint256 _index) public view returns(address SchoolAddress) {
            return SchoolIndex[_index];
        }

    }