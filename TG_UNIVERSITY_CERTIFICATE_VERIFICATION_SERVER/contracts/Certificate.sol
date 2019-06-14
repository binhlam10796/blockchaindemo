pragma solidity >=0.4.21 <0.6.0;

contract CertificateStorage {
    struct Certificate{
        string universityName;
        string typeOfDegree;
        string major;
        string name;
        string dateOfBirth;
        string status;
        uint256 yearOfGraduation;
        string degreeClassification;
        string modeOfStudy;
        string certificateDeliveryDate;
        uint256 number;
        string regNo;
        uint index;
    }

    struct historyUserCertificate {
        string thaotac;
        string createTimeCertificate;
        string comment;
        uint index;
    }


    mapping (address => Certificate) private CertificateMapping;
    address[] private certificateIndex;

    mapping (address => historyUserCertificate) private historyCertificate;
    address[] private historyCerIndex;


    event setCertificateEvent(
        address indexed rdid,
        string universityName,
        string typeOfDegree,
        string major,
        string name);

    event setCertificateAdditionEvent(
        address indexed rdid,
        string dateOfBirth,
        string  status,
        uint256 yearOfGraduation,
        string degreeClassification);

    event setCertificateAdditionEventDetail(
        address indexed rdid,
        string modeOfStudy,
        string certificateDeliveryDate,
        uint256 number,
        string regNo,
        uint index);

    //end event insert certificate


    event setHistoryEvent(
        address indexed rdhid,
        string thaotac,
        string createTimeCertificate,
        string comment,
        uint index);

    //event update status
    event updateStatus(
        address indexed rdid,
        string universityName,
        string typeOfDegree
    );

    event updateStatusAddition(
        string major,
        string name,
        string dateOfBirth,
        string  status
    );

    event updateStatusAdditionDetail(
        uint256 yearOfGraduation,
        string degreeClassification,
        string modeOfStudy,
        string certificateDeliveryDate,
        uint256 number,
        string regNo,
        uint index
    );
    //End update
    //begin insert certificate
    function setCertificate(
        address rdid,
        string memory universityName,
        string memory typeOfDegree,
        string memory major,
        string memory name
        ) public returns(uint _index){
            CertificateMapping[rdid].universityName = universityName;
            CertificateMapping[rdid].typeOfDegree = typeOfDegree;
            CertificateMapping[rdid].major = major;
            CertificateMapping[rdid].name = name;
                emit setCertificateEvent(
                    rdid,
                    universityName,
                    typeOfDegree,
                    major,
                    name
                    );
                return certificateIndex.length-1;
    }

    function setCertificateAddition(
        address rdid,
        string memory dateOfBirth,
        string memory status,
        uint256 yearOfGraduation,
        string memory degreeClassification
    )public returns(uint _index){
        CertificateMapping[rdid].dateOfBirth = dateOfBirth;
        CertificateMapping[rdid].status = status;
        CertificateMapping[rdid].yearOfGraduation = yearOfGraduation;
        CertificateMapping[rdid].degreeClassification = degreeClassification;
        emit setCertificateAdditionEvent(
            rdid,
            dateOfBirth,
            status,
            yearOfGraduation,
            degreeClassification
        );
        return certificateIndex.length-1;
    }


    function setCertificateAdditionDetail(
        address rdid,
        string memory modeOfStudy,
        string memory certificateDeliveryDate,
        uint256 number,
        string memory regNo
    )public returns(uint _index){
        CertificateMapping[rdid].modeOfStudy = modeOfStudy;
        CertificateMapping[rdid].certificateDeliveryDate = certificateDeliveryDate;
        CertificateMapping[rdid].number = number;
        CertificateMapping[rdid].regNo = regNo;
        CertificateMapping[rdid].index = certificateIndex.push(rdid)-1;
        emit setCertificateAdditionEventDetail(
            rdid,
            modeOfStudy,
            certificateDeliveryDate,
            number,
            regNo,
            CertificateMapping[rdid].index
        );
        return certificateIndex.length-1;
    }


    //end insert certificate
    //insert history certificate

    function setHistoryCer(
        address rdid,
        string memory thaotac,
        string memory createTimeCertificate,
        string memory comment
    ) public returns(uint _index){
        historyCertificate[rdid].thaotac = thaotac;
        historyCertificate[rdid].createTimeCertificate = createTimeCertificate;
        historyCertificate[rdid].comment = comment;
        historyCertificate[rdid].index = historyCerIndex.push(rdid)-1;
        emit setHistoryEvent(
            rdid,
            thaotac,
            createTimeCertificate,
            comment,
            historyCertificate[rdid].index);
        return historyCerIndex.length-1;
    }
    //end insert history event


    //show history
    function getHistoryCertificate(address _rdid) public view returns(
        address rdid,
        string memory thaotac,
        string memory createTimeCertificate,
        string memory comment
    ){
        return(
            _rdid,
            historyCertificate[_rdid].thaotac,
            historyCertificate[_rdid].createTimeCertificate,
            historyCertificate[_rdid].comment
        );
    }
    //end show history


    //update status certificate approve
    function approveCertificate(
        address rdid,
        string memory status
    ) public returns(bool success){
        CertificateMapping[rdid].status = status;
        emit updateStatusAddition(
            CertificateMapping[rdid].major,
            CertificateMapping[rdid].name,
            CertificateMapping[rdid].dateOfBirth,
            status
        );
        return true;
    }

    //Begin get certificate
    function getCertificate(address _rdid) public view returns(address rdid,
        string memory universityName,
        string memory typeOfDegree,
        string memory major,
        string memory name){
        return(
            _rdid,
            CertificateMapping[_rdid].universityName,
            CertificateMapping[_rdid].typeOfDegree,
            CertificateMapping[_rdid].major,
            CertificateMapping[_rdid].name
        );
    }


    function getCertificateAddition(address _rdid) public view returns(
        string memory dateOfBirth,
        string memory status,
        uint256 yearOfGraduation,
        string memory degreeClassification){
        return(
            CertificateMapping[_rdid].dateOfBirth,
            CertificateMapping[_rdid].status,
            CertificateMapping[_rdid].yearOfGraduation,
            CertificateMapping[_rdid].degreeClassification
        );
    }


    function getCertificateAdditionDetail(address _rdid) public view returns(
        string memory modeOfStudy,
        string memory certificateDeliveryDate,
        uint256 number,
        string memory regNo,
        uint index){
        return(
            CertificateMapping[_rdid].modeOfStudy,
            CertificateMapping[_rdid].certificateDeliveryDate,
            CertificateMapping[_rdid].number,
            CertificateMapping[_rdid].regNo,
            CertificateMapping[_rdid].index
        );
    }
    //End get certificate

    //Check user or not
    function isUser(address id) public view returns(bool isIndeed)
    {
        if(certificateIndex.length == 0) return false;
        return (certificateIndex[CertificateMapping[id].index] == id);
    }

    function getUserCount() public view returns(uint count)
    {
        return certificateIndex.length;
    }

    function getCertificateIndex(uint _index) public view returns(address _id)
    {
        return certificateIndex[_index];
    }


    //history

    function getHisCount() public view returns(uint count)
    {
        return historyCerIndex.length;
    }

    function getHisIndex(uint _index) public view returns(address _id)
    {
        return historyCerIndex[_index];
    }

}