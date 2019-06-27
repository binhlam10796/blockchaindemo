pragma solidity >=0.4.21 <0.6.0;

contract DegreeKindStorage {
    struct DegreeKind{
        string degreeKindName;
        uint index;
    }

    struct DegreeName{
        address idDegreeKind;
        string degreeName;
        uint index;
    }

    mapping (address => DegreeKind) DegreeKindMapping;
    address[] private DegreeKindIndex;

    mapping (address => DegreeName) DegreeNameMapping;
    address[] private DegreeNameIndex;


    event setDegreeKindEvent(address indexed degreeKindId , string degreeKindName, uint index);
    event updateDegreeKindNameEvent(address indexed degreeKindId, string degreeKindName, uint index);

    event setDegreeNameEvent(address indexed degreeNameId , address idDegreeKind, string degreeName, uint index);
    event updateDegreeNameEvent(address indexed degreeNameId, address idDegreeKind, string degreeName, uint index);


    function setDegreeKind(address degreeKindId, string memory degreeKindName) public returns(uint _index) {
        DegreeKindMapping[degreeKindId].degreeKindName = degreeKindName;
        DegreeKindMapping[degreeKindId].index = DegreeKindIndex.push(degreeKindId)-1;
        emit setDegreeKindEvent(degreeKindId, degreeKindName, DegreeKindMapping[degreeKindId].index);
        return DegreeKindIndex.length-1;
    }

    function getDegreeKind(address _degreeKindId) public view returns(address degreeKindId, string memory degreeKindName, uint index){
        return(_degreeKindId,
            DegreeKindMapping[_degreeKindId].degreeKindName,
            DegreeKindMapping[_degreeKindId].index
            );
    }

    function updateDegreeKindName(address _degreeKindId, string memory degreeKindName) public returns(bool success){
            DegreeKindMapping[_degreeKindId].degreeKindName = degreeKindName;
            emit updateDegreeKindNameEvent(_degreeKindId, degreeKindName, DegreeKindMapping[_degreeKindId].index);
            return true;
    }

    //DegreeName
    function setDegreeName(address degreeNameId, address idDegreeKind, string memory degreeName) public returns(uint _index) {
        DegreeNameMapping[degreeNameId].idDegreeKind = idDegreeKind;
        DegreeNameMapping[degreeNameId].degreeName = degreeName;
        DegreeNameMapping[degreeNameId].index = DegreeNameIndex.push(degreeNameId)-1;
        emit setDegreeNameEvent(degreeNameId, idDegreeKind, degreeName, DegreeNameMapping[degreeNameId].index);
        return DegreeNameIndex.length-1;
    }

    function getDegreeName(address _degreeNameId) public
    view returns(address degreeNameId,address idDegreeKind, string memory degreeName, uint index){
        return(_degreeNameId,
            DegreeNameMapping[_degreeNameId].idDegreeKind,
            DegreeNameMapping[_degreeNameId].degreeName,
            DegreeNameMapping[_degreeNameId].index
            );
    }

    function updateDegreeName(address _degreeNameId,address idDegreeKind, string memory degreeName) public returns(bool success){
            DegreeNameMapping[_degreeNameId].idDegreeKind = idDegreeKind;
            DegreeNameMapping[_degreeNameId].degreeName = degreeName;
            emit updateDegreeNameEvent(_degreeNameId, idDegreeKind, degreeName, DegreeNameMapping[_degreeNameId].index);
            return true;
    }

    //Ham check 2 struct
    function isDegreeKind(address id) public view returns(bool isIndeed)
    {
        if(DegreeKindIndex.length == 0) return false;
        return (DegreeKindIndex[DegreeKindMapping[id].index] == id);
    }

    function getDegreeKindIndex(uint _index) public view returns(address _id) {
        return DegreeKindIndex[_index];
    }

    function getDegreeKindCount() public view returns(uint count){
        return DegreeKindIndex.length;
    }

    //degreeName
    function isDegreeName(address id) public view returns(bool isIndeed)
    {
        if(DegreeNameIndex.length == 0) return false;
        return (DegreeNameIndex[DegreeNameMapping[id].index] == id);
    }

    function getDegreeNameIndex(uint _index) public view returns(address _id) {
        return DegreeNameIndex[_index];
    }

    function getDegreeNameCount() public view returns(uint count){
        return DegreeNameIndex.length;
    }

}