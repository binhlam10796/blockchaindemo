pragma solidity >=0.4.21 <0.6.0;

contract UserManagementStorage {
   //eventInsert
   struct UserManagement {
      address userAddress;
      string id;
      string name;
      string addr;
      string email;
      uint256 fax;
      uint256 phone;

      uint256 createdTime;
      uint256 modifiedTime;
      string islocked;
      uint256 index;
   }
   event SetUserManagementEvent(
      address _userAddress,
      string _id,
      string name,
      string addr,
      string email,
      uint256 fax,
      uint256 phone);

   event SetUserManagementAdditionEvent(
      address _userAddress,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string _isLocked);

   //eventUpdate
   event SetLogUpdateUserManagementEven(
      address _userAddress,
      string _id,
      string name,
      string addr,
      string email,
      uint256 fax,
      uint256 phone);
   event SetLogUpdateUserManagementAdditionEven(
      address _userAddress,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string _isLocked);

   //eventDelete
   event SetLogDeleteUserManagement(
      address _userAddress,
      uint256 index);

   mapping(address => UserManagement) userManagementStructs;

   address[] userIndex;

   function isUser(address _userAddress) public view returns(bool isIndeed) {
      if(userIndex.length == 0) return false;
      return (userIndex[userManagementStructs[_userAddress].index] == _userAddress);
   }

   function insertUser(
      address _userAddress,
      string memory _id,
      string memory _name,
      string memory _addr,
      string memory _email,
      uint256 _fax,
      uint256 _phone
      )
      public returns(uint256 index){
      //if(isUser(_userAddress)) revert('throw');
      userManagementStructs[_userAddress].id = _id;
      userManagementStructs[_userAddress].name = _name;
      userManagementStructs[_userAddress].addr = _addr;
      userManagementStructs[_userAddress].email = _email;
      userManagementStructs[_userAddress].fax = _fax;
      userManagementStructs[_userAddress].phone = _phone;

      emit SetUserManagementEvent(_userAddress, _addr, _id, _name, _email, _fax, _phone);
      // emit SetUserManagementAdditionEvent(_userAddress, _createdTime, _modifiedTime, _idCardNo, _idCardIssuePlace);
      // emit SetUserManagementAdditionFlusEvent(
      //    _userAddress,
      //    _phoneNumber,
      //    _job,
      //    _userAddr,
      //    userManagementAdditionFlusStructs[_userAddress].index);
      return userIndex.length-1;
   }

   function insertUserDetail(
      address _userAddress,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string memory _islocked
      )
      public returns(uint256 index){
      userManagementStructs[_userAddress].createdTime = _createdTime;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      userManagementStructs[_userAddress].islocked = _islocked;

      emit SetUserManagementAdditionEvent(_userAddress, _createdTime, _modifiedTime, _islocked);
      return userIndex.length-1;
   }

   function deleteUser(address _userAddress) public returns(uint256 index){
      // if(!isUser(_userAddress)) revert('throw');
      uint256 rowToDelete = userManagementStructs[_userAddress].index;
      address keyToMove = userIndex[userIndex.length-1];
      userIndex[rowToDelete] = keyToMove; //vi tri can delete = vi tri cuoi ds
      userManagementStructs[keyToMove].index = rowToDelete;

      userIndex.length--;
      emit SetLogDeleteUserManagement(
         _userAddress,
         rowToDelete);

      emit SetLogUpdateUserManagementEven(
         keyToMove,
         userManagementStructs[keyToMove].id,
         userManagementStructs[keyToMove].name,
         userManagementStructs[keyToMove].email,
         userManagementStructs[keyToMove].addr,
         userManagementStructs[keyToMove].fax,
         userManagementStructs[keyToMove].phone
         );
      emit SetLogUpdateUserManagementAdditionEven(
         keyToMove,
         userManagementStructs[keyToMove].createdTime,
         userManagementStructs[keyToMove].modifiedTime,
         userManagementStructs[keyToMove].islocked
         );
      return rowToDelete;
   }

   function getUser(address _userAddress) public view returns(
      address userAddress,
      string memory _id,
      string memory _name,
      string memory _email,
      string memory _addr,
      uint256 _fax,
      uint256 _phone
      ){
      // if(!isUser(_userAddress)) revert('throw');
      return(
         _userAddress,
         userManagementStructs[_userAddress].id,
         userManagementStructs[_userAddress].name,
         userManagementStructs[_userAddress].email,
         userManagementStructs[_userAddress].addr,
         userManagementStructs[_userAddress].fax,
         userManagementStructs[_userAddress].phone);
   }

   function getUserDetailMore(address _userAddress) public view returns(
      uint256 _createdTime,
      uint256 _modifiedTime,
      string memory _islocked
      ){
      // if(!isUser(_userAddress)) revert('throw');
      return(
         userManagementStructs[_userAddress].createdTime,
         userManagementStructs[_userAddress].modifiedTime,
         userManagementStructs[_userAddress].islocked);
   }

// UPDATE


   function updateFullName(address _userAddress, string  memory  _name, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].name = _name;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].id,
      //    _name,
      //    userManagementStructs[_userAddress].email,
      //    userManagementStructs[_userAddress].addr,
      //    userManagementStructs[_userAddress].fax,
      //    userManagementStructs[_userAddress].phone
      //    );
      return true;
   }

   function updateEmail(address _userAddress, string  memory  _email, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].email = _email;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].userId,
      //    userManagementStructs[_userAddress].fullName,
      //    _email,
      //    userManagementStructs[_userAddress].password,
      //    userManagementStructs[_userAddress].gender,
      //    userManagementStructs[_userAddress].dateOfBirth
      //    );
      return true;
   }

   function updateAddr(address _userAddress, string  memory  _addr, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].addr = _addr;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].userId,
      //    userManagementStructs[_userAddress].fullName,
      //    userManagementStructs[_userAddress].email,
      //    _password,
      //    userManagementStructs[_userAddress].gender,
      //    userManagementStructs[_userAddress].dateOfBirth
      //    );
      return true;
   }

   function updateFax(address _userAddress, uint256 _fax, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].fax = _fax;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].userId,
      //    userManagementStructs[_userAddress].fullName,
      //    userManagementStructs[_userAddress].email,
      //    userManagementStructs[_userAddress].password,
      //    _gender,
      //    userManagementStructs[_userAddress].dateOfBirth
      //    );
      return true;
   }

   function updatePhone(address _userAddress, uint256  _phone, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].phone = _phone;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].userId,
      //    userManagementStructs[_userAddress].fullName,
      //    userManagementStructs[_userAddress].email,
      //    userManagementStructs[_userAddress].password,
      //    userManagementStructs[_userAddress].gender,
      //    _dateOfBirth
      //    );
      return true;
   }

   function updateIslocked(address _userAddress, string  memory  _islocked, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].islocked = _islocked;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementAdditionEven(
      //    _userAddress,
      //    _isLocked,
      //    userManagementStructs[_userAddress].createdTime,
      //    userManagementStructs[_userAddress].modifiedTime,
      //    userManagementStructs[_userAddress].idCardNo,
      //    userManagementStructs[_userAddress].idCardIssuePlace
      //    );
      return true;
   }

   function getUserCount() public view returns(uint256 count){
         return userIndex.length;
      }

   function getUserAtIndex(uint256 _index)
      public
      view
      returns(address userAddress)
   {
      return userIndex[_index];
   }

}