pragma solidity >=0.4.21 <0.6.0;

contract DegreeNameStorage {

    // event setDegreeNameEvent(uint256 degreeKindId, uint256 _degreeNameId, string degreeName);

    uint256 index;

    struct DegreeName {
        uint256 degreeKindId;
        uint256 degreeNameId;
        string degreeName;
    }

    mapping (uint256 => DegreeName) DegreeNameMapping;

     //DegreeName degreeNames;

    function setDegreeName(uint256 _degreeKindId, uint256 _degreeNameId, string memory _degreeName) public {
        DegreeNameMapping[_degreeNameId].degreeKindId = _degreeKindId;
        DegreeNameMapping[_degreeNameId].degreeNameId = _degreeNameId;
        DegreeNameMapping[_degreeNameId].degreeName = _degreeName;

        // DegreeNameMapping[_degreeNameId] = degreeNames;
        index++;
        // emit setDegreeNameEvent(_degreeKindId, _degreeNameId, _degreeName);

        // return true;
    }

    function getDegreeName(uint256 _degreeNameId) public view returns(uint256 degreeKindId, uint256 degreeNameId, string memory degreeName) {
        // DegreeName memory tmpData = DegreeNameMapping[_degreeNameId];
        return (DegreeNameMapping[_degreeNameId].degreeKindId,
        DegreeNameMapping[_degreeNameId].degreeNameId,
        DegreeNameMapping[_degreeNameId].degreeName);
    }

    function getDegreeNameIndex() public view returns(uint256) {
        return index;
    }
}