pragma solidity >=0.4.21 <0.6.0;

contract DegreeKindStorage {

    // event setDegreeKindEvent(address userAddressKind, string degreeKindName);
    uint256 index;

    struct DegreeKind {
        address userAddressKind;
        string degreeKindName;
    }

    mapping (address => DegreeKind) DegreeKindMapping;


    // event LeaderUpdated(address userAddressKind , string degreeKindName);
    // event CountryDelete(address userAddressKind);

    DegreeKind degreeKind;

    function setDegreeKind(address _userAddressKind, string memory _degreeKindName) public returns(bool) {
        degreeKind.userAddressKind = _userAddressKind;
        degreeKind.degreeKindName = _degreeKindName;

        DegreeKindMapping[_userAddressKind] = degreeKind;
        // emit setDegreeKindEvent(_userAddressKind, _degreeKindName);
        index++;

        return true;
    }

    function getDegreeKind(address _userAddressKind) public view returns(address userAddressKind, string memory degreeKindName) {
        DegreeKind memory tmpData = DegreeKindMapping[_userAddressKind];
        return (tmpData.userAddressKind, tmpData.degreeKindName);
    }

    function getDegreeKindIndex() public view returns(uint256) {
        return index;
    }
}