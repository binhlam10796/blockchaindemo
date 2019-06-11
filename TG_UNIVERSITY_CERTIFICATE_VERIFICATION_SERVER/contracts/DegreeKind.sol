pragma solidity >=0.4.21 <0.6.0;

contract DegreeKindStorage {

    // event setDegreeKindEvent(uint degreeKindId, string degreeKindName);
    uint256 index;

    struct DegreeKind {
        uint8 degreeKindId;
        string degreeKindName;
    }

    mapping (uint8 => DegreeKind) DegreeKindMapping;


    event LeaderUpdated(uint8 degreeKindId , string degreeKindName);
    event CountryDelete(uint8 degreeKindId);

    DegreeKind degreeKind;

    function setDegreeKind(uint8 _degreeKindId, string memory _degreeKindName) public returns(bool) {
        degreeKind.degreeKindId = _degreeKindId;
        degreeKind.degreeKindName = _degreeKindName;

        DegreeKindMapping[_degreeKindId] = degreeKind;
        // emit setDegreeKindEvent(_degreeKindId, _degreeKindName);
        index++;

        return true;
    }

    function getDegreeKind(uint8 _degreeKindId) public view returns(uint8 degreeKindId, string memory degreeKindName) {
        DegreeKind memory tmpData = DegreeKindMapping[_degreeKindId];
        return (tmpData.degreeKindId, tmpData.degreeKindName);
    }

    function getDegreeKindIndex() public view returns(uint256) {
        return index;
    }
}