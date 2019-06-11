pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {

    event setCertificateEvent(
        string  _id,
        string _universityName,
        string _typeOfDegree,
        string _major,
        string _name,
        uint256 _dateOfBirth,
        string  _status);

    event setCertificateAdditionEvent(
        string  _id,
        uint256 _yearOfGraduation,
        string _degreeClassification,
        string _modeOfStudy,
        uint256 _certificateDeliveryDate,
        uint256 _number,
        string _regNo);

    event setUserConfirmCertificateEvent(
        string  _userId,
        string _userName,
        uint256 _dateTime,
        string _comment);

    uint256 index;

    struct Certificate {
        string id;
        string universityName;
        string typeOfDegree;
        string major;
        string name;
        uint256 dateOfBirth;
        string status;
    }

    struct CertificateAddition {
        string id;
        uint256 yearOfGraduation;
        string degreeClassification;
        string modeOfStudy;
        uint256 certificateDeliveryDate;
        uint256 number;
        string regNo;
    }

    struct UserConfirmCertificate {
        string userId;
        string userName;
        uint256 dateTime;
        string comment;
    }
    mapping (string => Certificate) CertificateMapping;
    mapping (string => CertificateAddition) CertificateAdditionMapping;
    mapping (string => UserConfirmCertificate) UserConfirmCertificateMapping;

    function setCertificate(string memory _id,
        string memory _universityName,
        string memory _typeOfDegree,
        string memory _major,
        string memory _name,
        uint256 _dateOfBirth,
        string memory _status,
        uint256 _yearOfGraduation,
        string memory _degreeClassification,
        string memory _modeOfStudy,
        uint256 _certificateDeliveryDate,
        uint256 _number,
        string memory _regNo) public {
        CertificateMapping[_id].id = _id;
        CertificateMapping[_id].universityName = _universityName;
        CertificateMapping[_id].typeOfDegree = _typeOfDegree;
        CertificateMapping[_id].major = _major;
        CertificateMapping[_id].name = _name;
        CertificateMapping[_id].dateOfBirth = _dateOfBirth;
        CertificateMapping[_id].status = _status;

        CertificateAdditionMapping[_id].yearOfGraduation = _yearOfGraduation;
        CertificateAdditionMapping[_id].degreeClassification = _degreeClassification;
        CertificateAdditionMapping[_id].modeOfStudy = _modeOfStudy;
        CertificateAdditionMapping[_id].certificateDeliveryDate = _certificateDeliveryDate;
        CertificateAdditionMapping[_id].number = _number;
        CertificateAdditionMapping[_id].regNo = _regNo;
        emit setCertificateEvent(_id, _universityName, _typeOfDegree, _major, _name, _dateOfBirth, _status);
        emit setCertificateAdditionEvent(_id, _yearOfGraduation, _degreeClassification, _modeOfStudy,
            _certificateDeliveryDate, _number, _regNo);

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

    function setUserConfirmCertificate(string memory _userId,
        string memory _userName,
        uint256 _dateTime,
        string memory _comment) public {
            UserConfirmCertificateMapping[_userId].userId = _userId;
            UserConfirmCertificateMapping[_userId].userName = _userName;
            UserConfirmCertificateMapping[_userId].dateTime = _dateTime;
            UserConfirmCertificateMapping[_userId].comment = _comment;

            emit setUserConfirmCertificateEvent(_userId, _userName, _dateTime, _comment);
        }

    function getCertificate(string memory _id) public view returns(string memory id,
        string memory universityName,
        string memory typeOfDegree,
        string memory major,
        string memory name,
        uint256 dateOfBirth,
        string memory status) {
        return (CertificateMapping[_id].id,
            CertificateMapping[_id].universityName,
            CertificateMapping[_id].typeOfDegree,
            CertificateMapping[_id].major,
            CertificateMapping[_id].name,
            CertificateMapping[_id].dateOfBirth,
            CertificateMapping[_id].status);
    }

    function getCertificateAddition(string memory _id) public view returns(string memory id,
        uint256 yearOfGraduation,
        string memory degreeClassification,
        string memory modeOfStudy,
        uint256 certificateDeliveryDate,
        uint256 number,
        string memory regNo) {
        return (CertificateAdditionMapping[_id].id,
        CertificateAdditionMapping[_id].yearOfGraduation,
        CertificateAdditionMapping[_id].degreeClassification,
        CertificateAdditionMapping[_id].modeOfStudy,
        CertificateAdditionMapping[_id].certificateDeliveryDate,
        CertificateAdditionMapping[_id].number,
        CertificateAdditionMapping[_id].regNo);
    }

    function getUserConfirmCertificatioin(string memory _id) public view returns(string memory userId,
        string memory userName,
        uint256 dateTime,
        string memory comment) {
            return (UserConfirmCertificateMapping[_id].userId,
            UserConfirmCertificateMapping[_id].userName,
            UserConfirmCertificateMapping[_id].dateTime,
            UserConfirmCertificateMapping[_id].comment);
        }
    function getCertificateIndex() public view returns(uint256) {
        return index;
    }
}