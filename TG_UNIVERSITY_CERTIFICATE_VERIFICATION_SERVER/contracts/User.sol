pragma solidity >=0.4.21 <0.6.0;

contract UserManagementStorage {
   //eventInsert
   event SetUserManagementEvent(
      address _userAddress,
      string _userId,
      string _fullName,
      string _email,
      string _password,
      string _gender,
      uint256 _dateOfBirth);

   event SetUserManagementAdditionEvent(
      address _userAddress,
      string _isLocked,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string _idCardNo,
      string _idCardIssuePlace);

   event SetUserManagementAdditionFlusEvent(
      address _userAddress,
      uint256 _phoneNumber,
      string _job,
      string _userAddr,
      uint256 _index);

   //eventUpdate
   event SetLogUpdateUserManagementEven(
      address _userAddress,
      string _userId,
      string _fullName,
      string _email,
      string _password,
      string _gender,
      uint256 _dateOfBirth);
   event SetLogUpdateUserManagementAdditionEven(
      address _userAddress,
      string _isLocked,
      uint256 _modifiedTime,
      uint256 _createdTime,
      string _idCardNo,
      string _idCardIssuePlace);
   event SetLogUpdateUserManagementAdditionFlusEven(
      address _userAddress,
      uint256 _phoneNumber,
      string _job,
      string _userAddr,
      uint256 _index);

   //eventDelete
   event SetLogDeleteUserManagement(
      address _userAddress,
      uint256 index);

   struct UserManagement {
      address userAddress;
      string userId;
      string fullName;
      string email;
      string password;
      string gender;
      uint256 dateOfBirth;
      string isLocked;

      uint256 createdTime;
      uint256 modifiedTime;
      string idCardNo;
      string idCardIssuePlace;

      uint256 phoneNumber;
      string job;
      string userAddr;
      uint256 index;
   }

   mapping(address => UserManagement) userManagementStructs;

   address[] userIndex;

   function isUser(address _userAddress) public view returns(bool isIndeed) {
      if(userIndex.length == 0) return false;
      return (userIndex[userManagementStructs[_userAddress].index] == _userAddress);
   }

   function insertUser(
      address _userAddress,
      string memory _userId,
      string memory _fullName,
      string memory _email,
      string memory _password,
      string memory _gender,
      uint256 _dateOfBirth
      )
      public returns(uint256 index){
      //if(isUser(_userAddress)) revert('throw');
      userManagementStructs[_userAddress].userId = _userId;
      userManagementStructs[_userAddress].fullName = _fullName;
      userManagementStructs[_userAddress].email = _email;
      userManagementStructs[_userAddress].password = _password;
      userManagementStructs[_userAddress].gender = _gender;
      userManagementStructs[_userAddress].dateOfBirth = _dateOfBirth;

      emit SetUserManagementEvent(_userAddress, _userId, _fullName, _email, _password, _gender, _dateOfBirth);
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
      string memory _isLocked,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string  memory _idCardNo,
      string  memory _idCardIssuePlace
      )
      public returns(uint256 index){
      userManagementStructs[_userAddress].isLocked = _isLocked;
      userManagementStructs[_userAddress].createdTime = _createdTime;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      userManagementStructs[_userAddress].idCardNo = _idCardNo;
      userManagementStructs[_userAddress].idCardIssuePlace = _idCardIssuePlace;

      emit SetUserManagementAdditionEvent(_userAddress, _isLocked, _createdTime, _modifiedTime, _idCardNo, _idCardIssuePlace);
      return userIndex.length-1;
   }

   function insertUserDetailFlus(
      address _userAddress,
      uint256 _phoneNumber,
      string  memory _job,
      string  memory _userAddr
      )
      public returns(uint256 index){
      // if(isUser(_userAddress)) revert('throw');
      userManagementStructs[_userAddress].phoneNumber = _phoneNumber;
      userManagementStructs[_userAddress].job = _job;
      userManagementStructs[_userAddress].userAddr = _userAddr;
      userManagementStructs[_userAddress].index = userIndex.push(_userAddress)-1;
      emit SetUserManagementAdditionFlusEvent(
         _userAddress,
         _phoneNumber,
         _job,
         _userAddr,
         userManagementStructs[_userAddress].index);
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
         userManagementStructs[keyToMove].userId,
         userManagementStructs[keyToMove].fullName,
         userManagementStructs[keyToMove].email,
         userManagementStructs[keyToMove].password,
         userManagementStructs[keyToMove].gender,
         userManagementStructs[keyToMove].dateOfBirth
         );
      emit SetLogUpdateUserManagementAdditionEven(
         keyToMove,
         userManagementStructs[keyToMove].isLocked,
         userManagementStructs[keyToMove].createdTime,
         userManagementStructs[keyToMove].modifiedTime,
         userManagementStructs[keyToMove].idCardNo,
         userManagementStructs[keyToMove].idCardIssuePlace
         );
      emit SetLogUpdateUserManagementAdditionFlusEven(
         keyToMove,
         userManagementStructs[keyToMove].phoneNumber,
         userManagementStructs[keyToMove].job,
         userManagementStructs[keyToMove].userAddr,
         rowToDelete);
      return rowToDelete;
   }

   function getUser(address _userAddress) public view returns(
      address userAddress,
      string memory _userId,
      string memory _fullName,
      string memory _email,
      string memory _password,
      string memory _gender,
      uint256 _dateOfBirth
      ){
      // if(!isUser(_userAddress)) revert('throw');
      return(
         _userAddress,
         userManagementStructs[_userAddress].userId,
         userManagementStructs[_userAddress].fullName,
         userManagementStructs[_userAddress].email,
         userManagementStructs[_userAddress].password,
         userManagementStructs[_userAddress].gender,
         userManagementStructs[_userAddress].dateOfBirth);
   }

   function getUserDetailMore(address _userAddress) public view returns(
      string memory _isLocked,
      uint256 _createdTime,
      uint256 _modifiedTime,
      string memory _idCardNo,
      string memory _idCardIssuePlace
      ){
      // if(!isUser(_userAddress)) revert('throw');
      return(
         userManagementStructs[_userAddress].isLocked,
         userManagementStructs[_userAddress].createdTime,
         userManagementStructs[_userAddress].modifiedTime,
         userManagementStructs[_userAddress].idCardNo,
         userManagementStructs[_userAddress].idCardIssuePlace);
   }

   function getUserDetailMoreMore(address _userAddress) public view returns(
      uint256 _phoneNumber,
      string  memory  _job,
      string  memory  _userAddr,
      uint256 index
      ){
      // if(!isUser(_userAddress)) revert('throw');
      return(
         userManagementStructs[_userAddress].phoneNumber,
         userManagementStructs[_userAddress].job,
         userManagementStructs[_userAddress].userAddr,
         userManagementStructs[_userAddress].index);
   }


// UPDATE


   function updateFullName(address _userAddress, string  memory  _fullName, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].fullName = _fullName;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      emit SetLogUpdateUserManagementEven(
         _userAddress,
         userManagementStructs[_userAddress].userId,
         _fullName,
         userManagementStructs[_userAddress].email,
         userManagementStructs[_userAddress].password,
         userManagementStructs[_userAddress].gender,
         userManagementStructs[_userAddress].dateOfBirth
         );
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

   function updatePassword(address _userAddress, string  memory  _password, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].password = _password;
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

   function updateGender(address _userAddress, string  memory  _gender, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].gender = _gender;
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

   function updateDateOfBirth(address _userAddress, uint256  _dateOfBirth, uint256 _modifiedTime)
      public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].dateOfBirth = _dateOfBirth;
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

   function updateIsLocked(address _userAddress, string  memory  _isLocked, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].isLocked = _isLocked;
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

   function updateIdCardNo(address _userAddress, string memory _idCardNo, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].idCardNo = _idCardNo;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementAdditionEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].isLocked,
      //    userManagementStructs[_userAddress].createdTime,
      //    userManagementStructs[_userAddress].modifiedTime,
      //    _idCardNo,
      //    userManagementStructs[_userAddress].idCardIssuePlace
      //    );
      return true;
   }

   function updateIdCardIssuePlace(address _userAddress, string memory _idCardIssuePlace, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].idCardIssuePlace = _idCardIssuePlace;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementAdditionEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].isLocked,
      //    userManagementStructs[_userAddress].createdTime,
      //    userManagementStructs[_userAddress].modifiedTime,
      //    userManagementStructs[_userAddress].idCardNo,
      //    _idCardIssuePlace);
      return true;
   }

   function updatePhoneNumber(address _userAddress, uint256 _phoneNumber, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].phoneNumber = _phoneNumber;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementAdditionFlusEven(
      //    _userAddress,
      //    _phoneNumber,
      //    userManagementStructs[_userAddress].job,
      //    userManagementStructs[_userAddress].userAddr,
      //    userManagementStructs[_userAddress].index);
      return true;
   }

   function updateJob(address _userAddress, string memory   _job, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].job = _job;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // userManagementStructs[_userAddress].userAddr = _userAddr;
      // emit SetLogUpdateUserManagementAdditionFlusEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].phoneNumber,
      //    _job,
      //    userManagementStructs[_userAddress].userAddr,
      //    userManagementStructs[_userAddress].index);
      return true;
   }

   function updateUserAddr(address _userAddress, string memory   _userAddr, uint256 _modifiedTime)
   public returns(bool success) {
      // if(!isUser(_userAddress))  revert('throw');
      userManagementStructs[_userAddress].userAddr = _userAddr;
      userManagementStructs[_userAddress].modifiedTime = _modifiedTime;
      // emit SetLogUpdateUserManagementAdditionFlusEven(
      //    _userAddress,
      //    userManagementStructs[_userAddress].phoneNumber,
      //    userManagementStructs[_userAddress].job,
      //    _userAddr,
      //    userManagementStructs[_userAddress].index);
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