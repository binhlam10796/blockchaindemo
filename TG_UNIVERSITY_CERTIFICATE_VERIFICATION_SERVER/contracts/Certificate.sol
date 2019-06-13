pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {

    event setCertificateEvent(address _userAddress,
        string  _macb,
        string _tencb,
        string _mavb,
        string _thaotac,
        string _thoidiem,
        string _diengiai,
        uint256 _index);

    // event setCertificateAdditionEvent(
    //     string  _id,
    //     uint256 _yearOfGraduation,
    //     string _degreeClassification,
    //     string _modeOfStudy,
    //     uint256 _certificateDeliveryDate,
    //     uint256 _number,
    //     string _regNo);

    // event setUserConfirmCertificateEvent(
    //     string  _userId,
    //     string _userName,
    //     uint256 _dateTime,
    //     string _comment);

    struct Certificate {
        address userAddress;
        string macb;
        string tencb; 
        string mavb;
        string thaotac;
        string thoidiem;
        string diengiai;
        uint256 index;
    }

    // struct CertificateAddition {
    //     string id;
    //     uint256 yearOfGraduation;
    //     string degreeClassification;
    //     string modeOfStudy;
    //     uint256 certificateDeliveryDate;
    //     uint256 number;
    //     string regNo;
    // }

    // struct UserConfirmCertificate {
    //     string userId;
    //     string userName;
    //     uint256 dateTime;
    //     string comment;
    // }
    mapping (address => Certificate) CertificateMapping;
    // mapping (string => CertificateAddition) CertificateAdditionMapping;
    // mapping (string => UserConfirmCertificate) UserConfirmCertificateMapping;

    function setCertificate(address _userAddress, string memory _macb, string memory _tencb, string memory _mavb, string memory _thaotac,
        string memory _thoidiem, string memory _diengiai) public returns(uint256 index){
        CertificateMapping[_userAddress].macb = _macb;
        CertificateMapping[_userAddress].tencb = _tencb;
        CertificateMapping[_userAddress].mavb = _mavb;
        CertificateMapping[_userAddress].thaotac = _thaotac;
        CertificateMapping[_userAddress].thoidiem = _thoidiem;
        CertificateMapping[_userAddress].diengiai = _diengiai;

        // CertificateAdditionMapping[_id].yearOfGraduation = _yearOfGraduation;
        // CertificateAdditionMapping[_id].degreeClassification = _degreeClassification;
        // CertificateAdditionMapping[_id].modeOfStudy = _modeOfStudy;
        // CertificateAdditionMapping[_id].certificateDeliveryDate = _certificateDeliveryDate;
        // CertificateAdditionMapping[_id].number = _number;
        // CertificateAdditionMapping[_id].regNo = _regNo;
        emit setCertificateEvent(_userAddress, _macb, _tencb, _mavb, _thaotac, _thoidiem, _diengiai, CertificateMapping[_userAddress].index );
        // emit setCertificateAdditionEvent(_id, _yearOfGraduation, _degreeClassification, _modeOfStudy,
        //     _certificateDeliveryDate, _number, _regNo);

        index++;
    }

    // function setCertificateAddition(string memory _id,
    //     uint256 _yearOfGraduation,
    //     string memory _degreeClassification,
    //     string memory _modeOfStudy,
    //     uint256 _certificateDeliveryDate,
    //     uint256 _number,
    //     string memory _regNo) public {
    //     CertificateAdditionMapping[_id].id = _id;
    //     CertificateAdditionMapping[_id].yearOfGraduation = _yearOfGraduation;
    //     CertificateAdditionMapping[_id].degreeClassification = _degreeClassification;
    //     CertificateAdditionMapping[_id].modeOfStudy = _modeOfStudy;
    //     CertificateAdditionMapping[_id].certificateDeliveryDate = _certificateDeliveryDate;
    //     CertificateAdditionMapping[_id].number = _number;
    //     CertificateAdditionMapping[_id].regNo = _regNo;

    //     emit setCertificateAdditionEvent(_id, _yearOfGraduation, _degreeClassification, _modeOfStudy,
    //         _certificateDeliveryDate, _number, _regNo);
    // }

    // function setUserConfirmCertificate(string memory _userId,
    //     string memory _userName,
    //     uint256 _dateTime,
    //     string memory _comment) public {
    //         UserConfirmCertificateMapping[_userId].userId = _userId;
    //         UserConfirmCertificateMapping[_userId].userName = _userName;
    //         UserConfirmCertificateMapping[_userId].dateTime = _dateTime;
    //         UserConfirmCertificateMapping[_userId].comment = _comment;

    //         emit setUserConfirmCertificateEvent(_userId, _userName, _dateTime, _comment);
    //     }

    function getCertificate(address _userAddress) public view returns(address userAddress, string memory _macb, string memory _tencb,
    string memory _mavb, string memory _thaotac, string memory _thoidiem, string memory _diengiai, uint256 _index) {
        return (_userAddress,
            CertificateMapping[_userAddress].macb,
            CertificateMapping[_userAddress].tencb,
            CertificateMapping[_userAddress].mavb,
            CertificateMapping[_userAddress].thaotac,
            CertificateMapping[_userAddress].thoidiem,
            CertificateMapping[_userAddress].diengiai,
            CertificateMapping[_userAddress].index);
    }

    // function getCertificateAddition(string memory _id) public view returns(string memory id,
    //     uint256 yearOfGraduation,
    //     string memory degreeClassification,
    //     string memory modeOfStudy,
    //     uint256 certificateDeliveryDate,
    //     uint256 number,
    //     string memory regNo) {
    //     return (CertificateAdditionMapping[_id].id,
    //     CertificateAdditionMapping[_id].yearOfGraduation,
    //     CertificateAdditionMapping[_id].degreeClassification,
    //     CertificateAdditionMapping[_id].modeOfStudy,
    //     CertificateAdditionMapping[_id].certificateDeliveryDate,
    //     CertificateAdditionMapping[_id].number,
    //     CertificateAdditionMapping[_id].regNo);
    // }

    // function getUserConfirmCertificatioin(string memory _id) public view returns(string memory userId,
    //     string memory userName,
    //     uint256 dateTime,
    //     string memory comment) {
    //         return (UserConfirmCertificateMapping[_id].userId,
    //         UserConfirmCertificateMapping[_id].userName,
    //         UserConfirmCertificateMapping[_id].dateTime,
    //         UserConfirmCertificateMapping[_id].comment);
    //     }
    function getCertificateIndex() public view returns(uint256 index) {
        return index;
    }
}